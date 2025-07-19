from flask import Blueprint, jsonify

stations_bp = Blueprint("stations", __name__)

@stations_bp.route("/charging", methods=["GET"])
def get_charging_stations():
    stations = [
        {"name": "Tesla Supercharger", "location": "401 & Winston Churchill", "type": "Fast"},
        {"name": "Flo EV Station", "location": "Toronto Eaton Centre", "type": "Level 2"},
        {"name": "ChargePoint", "location": "Square One Mississauga", "type": "Fast"}
    ]
    return jsonify({"stations": stations})
