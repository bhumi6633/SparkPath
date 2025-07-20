# from flask import Blueprint, request, jsonify
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# #load the env
# load_dotenv()
# #creates a flask blueprint
# ai_bp = Blueprint("ai", __name__)

# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
# model = genai.GenerativeModel("models/gemini-2.0-flash") #geminipro model

# # @ai_bp.route("/ask", methods=["POST"])
# # def ask_question():
# #     data = request.get_json()
# #     question = data.get("message", "")
    
# #     if not question:
# #         return jsonify({"error": "No message provided"}), 400

# #     try:
# #         response = model.generate_content(question)
# #         return jsonify({"response": response.text})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# @ai_bp.route("/ask", methods=["POST"])
# def ask_question():
#     data = request.get_json()
#     question = data.get("message", "")
    
#     print("Incoming message:", question)
#     print(" GOOGLE_API_KEY:", os.getenv("GOOGLE_API_KEY"))

#     if not question:
#         return jsonify({"error": "No message provided"}), 400

#     try:
#         response = model.generate_content(question)
#         print(" Gemini response:", response.text)
#         return jsonify({"response": response.text})
#     except Exception as e:
#         print("Gemini ERROR:", e)
#         return jsonify({"error": str(e)}), 500

# File: routes/ai.py (Flask backend for Gemini)
from flask import Blueprint, request, jsonify
import os
import google.generativeai as genai

ai_bp = Blueprint('ai', __name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@ai_bp.route('/ask', methods=['POST'])
def ask_ecobot():
    data = request.get_json()
    message = data.get('message', '').strip()
    distance = data.get('distance', '')
    duration = data.get('duration', '')
    origin = data.get('from', '')
    destination = data.get('to', '')

    if not message:
        return jsonify({ 'response': 'No message received.' }), 400

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        context_prompt = (
            f"You are EcoBot+, a helpful SparkPath assistant for sustainable rideshare planning.\n"
            f"The user is planning a ride from {origin} to {destination}.\n"
            f"The estimated distance is {distance} and the duration is {duration}.\n"
            f"Please use this context to answer the user's question helpfully and informatively."
        )

        chat = model.start_chat(history=[
            {
                "role": "user",
                "parts": [context_prompt]
            }
        ])
        result = chat.send_message(message)
        return jsonify({ 'response': result.text })

    except Exception as e:
        print("Gemini error:", e)
        return jsonify({ 'response': 'EcoBot+ encountered a Gemini error. Please try again later.' }), 500
