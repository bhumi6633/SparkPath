from flask import Blueprint, jsonify, current_app

summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/', methods=['GET'])
def def_summary():
    try:
        rides = list(current_app.db.rides.find())

        if not rides:
            return jsonify({
                "total_rides": 0,
                "total_distance_km": 0,
                "total_co2_saved_kg": 0,
                "total_trees_saved": 0
            })

        total_rides = len(rides)
        total_distance = sum(ride.get("distance_km", 0) for ride in rides)
        total_co2 = sum(ride.get("co2_saved_kg", 0) for ride in rides)
        total_trees = sum(ride.get("trees_saved", 0) for ride in rides)

        return jsonify({
            "total_rides": total_rides,
            "total_distance_km": round(total_distance, 2),
            "total_co2_saved_kg": round(total_co2, 2),
            "total_trees_saved": round(total_trees, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def format_ride_summary(data):
    return (
        f"You're riding a {data['model']} over {data['distance_km']} km. "
        f"This trip will take approximately {data['duration_minutes']} minutes. "
        f"With {data['passengers']} passenger(s), you're saving {data['co2_saved_kg']} kg of CO₂, "
        f"which is equivalent to saving {data['trees_saved']} trees. 🌱"
    )
