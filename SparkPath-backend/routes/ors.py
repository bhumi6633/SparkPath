# routes/ors.py
from flask import Blueprint, request, jsonify
import openrouteservice

ors_bp = Blueprint('ors', __name__)

#  Hardcoded ORS API key (ONLY for testing!)
client = openrouteservice.Client(key='eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFlNjczY2RiZWY4ZjQyZGU5ZWUyNjdmMTg5NWZiYjM0IiwiaCI6Im11cm11cjY0In0=')

@ors_bp.route('/route', methods=['POST'])
def get_route():
    data = request.get_json()
    start = data.get("start")  # [lng, lat]
    end = data.get("end")      # [lng, lat]

    if not start or not end:
        return jsonify({"error": "Start and end coordinates required"}), 400

    try:
        route = client.directions(
            coordinates=[start, end],
            profile='driving-car',
            format='geojson'
        )

        # Extract summary info
        summary = route['features'][0]['properties']['summary']
        distance_km = round(summary['distance'] / 1000, 2)
        duration_min = round(summary['duration'] / 60, 2)

        return jsonify({
            "geojson": route,
            "distance": distance_km,
            "duration": duration_min
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
