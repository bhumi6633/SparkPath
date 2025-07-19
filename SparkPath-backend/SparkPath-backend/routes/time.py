from flask import Blueprint, request, jsonify

time_bp = Blueprint("time", __name__)

@time_bp.route("/saved", methods=["POST"])
def calculate_time_saved():
    data = request.get_json()
    distance = data.get("distance_km", 0)
    speed_regular = data.get("avg_speed_regular", 60)
    speed_hov = data.get("avg_speed_hov", 90)

    if speed_regular <= 0 or speed_hov <= 0:
        return jsonify({"error": "Invalid speeds"}), 400

    time_regular = distance / speed_regular
    time_hov = distance / speed_hov

    time_saved_min = round((time_regular - time_hov) * 60, 2)

    return jsonify({
        "distance_km": distance,
        "avg_speed_regular": speed_regular,
        "avg_speed_hov": speed_hov,
        "time_saved_minutes": time_saved_min
    })
