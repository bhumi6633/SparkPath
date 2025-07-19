# routes/ors.py
from flask import Blueprint, request, jsonify
import openrouteservice

ors_bp = Blueprint('ors', __name__)

#  Hardcoded ORS API key (ONLY for testing!)
client = openrouteservice.Client(key='eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFlNjczY2RiZWY4ZjQyZGU5ZWUyNjdmMTg5NWZiYjM0IiwiaCI6Im11cm11cjY0In0=')

@ors_bp.route('/ors/route', methods=['POST'])
def get_route():
    data = request.get_json()
    start = data.get("start")  # [lng, lat]
    end = data.get("end")      # [lng, lat]

    if not start or not end:
        return jsonify({"error": "Start and end required"}), 400

    try:
        route = client.directions(
            coordinates=[start, end],
            profile='driving-car',
            format='geojson'
        )
        return jsonify(route)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
