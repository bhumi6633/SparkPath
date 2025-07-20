#user posts a ride

from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

post_ride_bp = Blueprint('post_ride', __name__)

@post_ride_bp.route('/', methods=['POST'])
def post_ride():
    try:
        data = request.get_json()
        required_fields = ['driver_name', 'start_location', 'end_location', 'seats', 'trip_description']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400

        ride = {
            **data,
            "created_at": datetime.utcnow(),
            "status": "available"
        }

        current_app.db.rides.insert_one(ride)
        return jsonify({"message": "Ride posted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
