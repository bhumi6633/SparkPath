from flask import Blueprint, request, jsonify
from flask import current_app
#from bson import ObjectId
from datetime import datetime
from utils.maps_helper import get_distance_and_duration
from utils.carbon_calc import (
    calculate_co2_saved,
    convert_to_trees_saved,
    apply_pooling_mult
)
from prompt_builder import format_ride_summary
from eco_gemini import ask_gemini

rides_bp = Blueprint('rides', __name__)

mock_evs = [
    {"id": 1, "model": "Tesla Model 3", "battery": 85, "range_km": 40},
    {"id": 2, "model": "Nissan Leaf", "battery": 60, "range_km": 24},
    {"id": 3, "model": "Chevy Bolt", "battery": 40, "range_km": 30},
]

@rides_bp.route('/', methods=['GET'])
def get_available_rides():
    return jsonify(mock_evs)


@rides_bp.route('/find-a-ride', methods=['POST'])
def find_a_ride():
    data = request.get_json()
    pickup = data.get("pickup")
    dropoff = data.get("dropoff")
    passengers = data.get("passengers", 1)
    user_question = data.get("question", "What’s my carbon impact today?")

    if not pickup or not dropoff:
        return jsonify({"error": "Missing pickup or dropoff"}), 400

    trip_info = get_distance_and_duration(pickup, dropoff)
    if not trip_info:
        return jsonify({"error": "Could not get route information!"}), 500

    ride_dist = trip_info["distance_km"]
    duration = trip_info["duration_minutes"]

    suitable_evs = []
    for ev in mock_evs:
        rem_range = (ev['battery'] / 100) * ev['range_km']
        if rem_range >= ride_dist:
            ev['remaining_range'] = round(rem_range, 1)
            suitable_evs.append(ev)

    if not suitable_evs:
        return jsonify({"error": "No EVs available for this ride at the moment!"}), 404

    selected_ev = max(suitable_evs, key=lambda x: x['remaining_range'])

    #  Carbon logic using utils
    base_co2 = calculate_co2_saved(ride_dist)
    pooled_co2 = apply_pooling_mult(base_co2, passengers)
    trees_saved = convert_to_trees_saved(pooled_co2)

    #  Gemini summary + response
    prompt = format_ride_summary({
        "model": selected_ev['model'],
        "distance_km": ride_dist,
        "duration_minutes": duration,
        "co2_saved_kg": pooled_co2,
        "trees_saved": trees_saved,
        "passengers": passengers
    })

    gemini_reply = ask_gemini(prompt, user_question)

    return jsonify({
        "assigned_vehicle": {
            "model": selected_ev['model'],
            "battery": selected_ev['battery'],
            "range_km": selected_ev['range_km'],
            "remaining_range": selected_ev['remaining_range']
        },
        "pickup": pickup,
        "dropoff": dropoff,
        "distance_km": ride_dist,
        "duration_minutes": duration,
        "passengers": passengers,
        "co2_saved_kg": pooled_co2,
        "trees_saved": trees_saved,
        "gemini_prompt_summary": prompt,
        "gemini_response": gemini_reply
    })

@rides_bp.route('/book', methods=['POST'])
def book_ride():
    data = request.get_json()

    # Basic required fields
    required_fields = ['pickup', 'dropoff', 'distance_km', 'passengers', 'co2_saved_kg']
    missing = [field for field in required_fields if field not in data]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    try:
        current_app.db.rides.insert_one(data)
        return jsonify({"message": "Ride stored successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@rides_bp.route('/history', methods=['GET'])
def get_ride_history():
    try:
        # Optional query params
        user_id = request.args.get('user_id')
        start_date = request.args.get('start_date')  # Format: YYYY-MM-DD
        end_date = request.args.get('end_date')      # Format: YYYY-MM-DD

        query = {}

        if user_id:
            query['user_id'] = user_id

        if start_date or end_date:
            query['timestamp'] = {}

            if start_date:
                query['timestamp']['$gte'] = datetime.strptime(start_date, "%Y-%m-%d")
            if end_date:
                query['timestamp']['$lte'] = datetime.strptime(end_date, "%Y-%m-%d")

        rides_cursor = current_app.db.rides.find(query)
        rides = []
        for ride in rides_cursor:
            ride['_id'] = str(ride['_id'])
            ride['timestamp'] = ride.get('timestamp', datetime.utcnow()).strftime("%Y-%m-%d %H:%M")
            rides.append(ride)

        return jsonify(rides), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500