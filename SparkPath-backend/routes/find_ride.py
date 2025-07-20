from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
from utils.maps_helper import get_distance_and_duration
from utils.carbon_calc import calculate_co2_saved, convert_to_trees_saved, apply_pooling_mult
from utils.geocode_helper import geocode_location
from routes.summary import format_ride_summary
# from eco_gemini import ask_gemini

find_ride_bp = Blueprint('find_ride', __name__)

# Mock EV pool
mock_evs = [
    {"model": "Tesla Model 3", "battery": 85, "range_km": 40},
    {"model": "Nissan Leaf", "battery": 60, "range_km": 24},
    {"model": "Chevy Bolt", "battery": 40, "range_km": 30},
]

@find_ride_bp.route('/', methods=['POST'])
def find_a_ride():
    try:
        data = request.get_json()
        pickup_str = data.get("pickup")
        dropoff_str = data.get("dropoff")
        passengers = data.get("passengers", 1)
        user_id = data.get("user_id", "anonymous")
        user_question = data.get("question", "How eco-friendly is my ride?")

        if not pickup_str or not dropoff_str:
            return jsonify({"error": "Missing pickup or dropoff"}), 400

        # Geocode pickup and dropoff strings to lat/lng
        pickup_coords = geocode_location(pickup_str)
        dropoff_coords = geocode_location(dropoff_str)

        if not pickup_coords or not dropoff_coords:
            return jsonify({"error": "Could not geocode locations"}), 400

        # Calculate route
        route = get_distance_and_duration(pickup_coords, dropoff_coords)
        if not route:
            return jsonify({"error": "Could not calculate route"}), 500

        distance_km = route["distance_km"]
        duration_minutes = route["duration_minutes"]

        # Choose an EV
        suitable_evs = []
        for ev in mock_evs:
            remaining = (ev["battery"] / 100) * ev["range_km"]
            if remaining >= distance_km:
                ev["remaining_range"] = round(remaining, 1)
                suitable_evs.append(ev)

        if not suitable_evs:
            return jsonify({"error": "No EVs can complete this ride"}), 404

        selected_ev = max(suitable_evs, key=lambda ev: ev["remaining_range"])

        # Calculate savings
        co2_saved = apply_pooling_mult(calculate_co2_saved(distance_km), passengers)
        trees_saved = convert_to_trees_saved(co2_saved)

        # Generate AI summary
        prompt = format_ride_summary({
            "model": selected_ev["model"],
            "distance_km": distance_km,
            "duration_minutes": duration_minutes,
            "co2_saved_kg": co2_saved,
            "trees_saved": trees_saved,
            "passengers": passengers
        })
        # gemini_reply = ask_gemini(prompt, user_question)

        # Store ride
        ride_doc = {
            "user_id": user_id,
            "pickup": pickup_str,
            "dropoff": dropoff_str,
            "pickup_coords": pickup_coords,
            "dropoff_coords": dropoff_coords,
            "passengers": passengers,
            "assigned_ev": selected_ev,
            "distance_km": distance_km,
            "duration_minutes": duration_minutes,
            "co2_saved_kg": co2_saved,
            "trees_saved": trees_saved,
            "gemini_prompt": prompt,
            # "gemini_reply": gemini_reply,
            "timestamp": datetime.utcnow(),
            "status": "planned"
        }

        current_app.db.rides.insert_one(ride_doc)

        return jsonify({
            "assigned_vehicle": selected_ev,
            "pickup": pickup_str,
            "dropoff": dropoff_str,
            "pickup_coords": pickup_coords,
            "dropoff_coords": dropoff_coords,
            "distance_km": distance_km,
            "duration_minutes": duration_minutes,
            "passengers": passengers,
            "co2_saved_kg": co2_saved,
            "trees_saved": trees_saved,
            # "gemini_summary": gemini_reply
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
