from flask import Blueprint, jsonify

summary_bp = Blueprint("summary", __name__)

@summary_bp.route("/", methods=["GET"])
def get_summary():
    return jsonify({
        "carbon_saved_kg": 4.75,
        "time_saved_minutes": 6.3,
        "ai_tip": "Use HOV lane on Hwy 403 during rush hour",
        "chargers_nearby": 2
    })
