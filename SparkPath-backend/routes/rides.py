from flask import Blueprint, jsonify

rides_bp = Blueprint('rides', __name__)

@rides_bp.route('/', methods=['GET'])

def get_available_rides():
    rides = [
        {"id": 1, "model": "Tesla Model 3", "battery": 85, "range_km": 400},
        {"id": 2, "model": "Nissan Leaf", "battery": 70, "range_km": 240}
    ]
    return jsonify(rides)