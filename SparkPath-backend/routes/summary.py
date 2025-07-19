from flask import Blueprint, request, jsonify
from utils.carbon_calc import calculate_co2_saved, convert_to_trees_saved, apply_pooling_mult

summary_bp = Blueprint("summary",__name__)

@summary_bp.route("/",methods=["POST"])
def ride_summary():
    data = request.get_json()

    distance_km = data.get("distance_km",0)
    passengers= data.get("passengers",1)
    avg_speed_hov = data.get("avg_speed_hov", 90)
    avg_speed_regular = data.get("avg_speed_regular", 60)

    #time saved because you take carpooling line
    time_regular = distance_km/ avg_speed_regular
    time_hov = distance_km / avg_speed_hov
    time_saved = round((time_regular - time_hov)* 60,2)

    #calculating carbon emission saved hence number of trees saved
    co2 = calculate_co2_saved(distance_km)
    co2_pooled = apply_pooling_mult(co2, passengers)
    trees = convert_to_trees_saved(co2_pooled)

    summary = {
        "distance_km": distance_km,
        "passengers": passengers,
        "time_saved_minutes": time_saved,
        "co2_saved_kg": co2_pooled,
        "trees_saved": trees
    }

    return jsonify(summary)