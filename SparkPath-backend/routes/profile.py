from flask import Blueprint, request, jsonify, current_app

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/create', methods=['POST'])
def create_profile():
    data = request.get_json()
    required_fields = ['user_id', 'name', 'email']  # Customize as needed

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing user_id, name or email"}), 400

    try:
        current_app.db.users.insert_one(data)
        return jsonify({"message": "Profile created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@profile_bp.route('/<user_id>', methods=['GET'])
def get_profile(user_id):
    user = current_app.db.users.find_one({"user_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    user['_id'] = str(user['_id'])
    return jsonify(user)
