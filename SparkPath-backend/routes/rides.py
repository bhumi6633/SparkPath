from flask import Blueprint, request, jsonify
from utils.maps_helper import get_distance_and_duration
rides_bp = Blueprint('rides', __name__)

mock_evs = [
    {"id": 1, "model": "Tesla Model 3", "battery": 85, "range_km": 40},
    {"id": 2, "model": "Nissan Leaf", "battery": 60, "range_km": 24},
    {"id": 3, "model": "Chevy Bolt", "battery": 40, "range_km": 30},
]



@rides_bp.route('/', methods=['GET'])
def get_available_rides():
    return jsonify(mock_evs)



@rides_bp.route('find-a-ride', methods=['POST'])
def find_a_ride():
    data = request.get_json()
    # ride_dist = data.get('estimated_distance_km', 0)
    pickup = data.get("pickup")
    dropoff = data.get("dropoff")
    passengers = data.get('passengers', 1)


    if not pickup or not dropoff:
        return jsonify({"error": "Missing pickup or dropoff"}), 400
    
    #we will use the map api to get the real dist

    total_trip_info = get_distance_and_duration(pickup, dropoff)
    if not total_trip_info:
        return jsonify({"error": "Could not get route information!"}), 500
    

    ride_dist = total_trip_info["distance_km"]

    #We will find EV's with enough range that can do with the ride
    suitable_evs = []
    for ev in mock_evs:
        rem_range = (ev['battery']/100) * ev['range_km']
        if rem_range >= ride_dist:
            ev['remaining_range'] = round(rem_range, 1)
            suitable_evs.append(ev)

    if not suitable_evs:
        return jsonify({"error": "No EV's available for this ride at the moment!"}), 404
    
    #selecting the ride with the max range
    selected_evs = max(suitable_evs, key= lambda x: x['remaining_range'])

    return jsonify({
        "assigned_vehicle": {
            "model": selected_evs['model'],
            "battery": selected_evs['battery'],
            "range_km": selected_evs['range_km'],
            "remaining_range": selected_evs['remaining_range']

        },

        "estimated_distance_km": ride_dist,
        "passengers": passengers
    })
