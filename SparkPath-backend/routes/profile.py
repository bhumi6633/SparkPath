from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

profile_bp = Blueprint('profile', __name__)

# Create a user profile
@profile_bp.route('/create', methods=['POST'])
def create_profile():
    data = request.get_json()
    required_fields = ['user_id', 'name', 'email']

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing user_id, name, or email"}), 400

    # Check if user already exists
    existing = current_app.db.users.find_one({"user_id": data['user_id']})
    if existing:
        return jsonify({"message": "User already exists"}), 200

    # Add creation timestamp
    data['created_at'] = datetime.utcnow()

    try:
        current_app.db.users.insert_one(data)
        return jsonify({"message": "Profile created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get user profile by user_id
@profile_bp.route('/<user_id>', methods=['GET'])
def get_profile(user_id):
    user = current_app.db.users.find_one({"user_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    user['_id'] = str(user['_id'])
    return jsonify(user)


# Update user profile (optional)
@profile_bp.route('/<user_id>', methods=['PATCH'])
def update_profile(user_id):
    updates = request.get_json()
    if not updates:
        return jsonify({"error": "No update data provided"}), 400

    try:
        result = current_app.db.users.update_one(
            {"user_id": user_id},
            {"$set": updates}
        )
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": "Profile updated successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
