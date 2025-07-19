from flask import Blueprint, request, jsonify, current_app

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/auth/signup', methods=['POST'])
def signup():
    db = current_app.db
    data = request.json

    required_fields = ["first_name", "last_name", "email", "password", "car_model", "car_color"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    if db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    db.users.insert_one(data)
    return jsonify({"message": "User created successfully"}), 201
