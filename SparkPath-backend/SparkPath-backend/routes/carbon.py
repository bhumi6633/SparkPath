from flask import Blueprint, request, jsonify
from utils.carbon_calc import calculate_co2_saved, convert_to_trees_saved, apply_pooling_mult

carbon_bp = Blueprint('carbon', __name__)

@carbon_bp.route('/', methods=['POST'])

def get_carbon_savings():
    data= request.get_json()
    distance_km = data.get('distance_km', 0)
    passengers = data.get('passengers', 1)

    base_co2 = calculate_co2_saved(distance_km)
    pooled_co2 = apply_pooling_mult(base_co2, passengers)
    trees_saved = convert_to_trees_saved(pooled_co2)

    response = {
        "distance_km": distance_km,
        "passengers": passengers,
        "co2_saved_kg": pooled_co2,
        "trees_saved": trees_saved
    }

    return jsonify(response)