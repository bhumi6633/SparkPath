from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/summary/<user_id>", methods=["GET"])
def get_dashboard_summary(user_id):
    try:
        rides = list(current_app.db.rides.find({"user_id": user_id}))

        if not rides:
            return jsonify({"message": "No rides found for user", "total_rides": 0}), 404

        total_rides = len(rides)
        total_distance = sum(ride.get("distance_km", 0) for ride in rides)
        total_co2 = sum(ride.get("co2_saved_kg", 0) for ride in rides)
        total_trees = sum(ride.get("trees_saved", 0) for ride in rides)

        return jsonify({
            "user_id": user_id,
            "total_rides": total_rides,
            "total_distance_km": round(total_distance, 2),
            "total_co2_saved_kg": round(total_co2, 2),
            "total_trees_saved": round(total_trees, 2)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
