from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

#load the env
load_dotenv()
#creates a flask blueprint
ai_bp = Blueprint("ai", __name__)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("models/gemini-2.0-flash") #geminipro model

# @ai_bp.route("/ask", methods=["POST"])
# def ask_question():
#     data = request.get_json()
#     question = data.get("message", "")
    
#     if not question:
#         return jsonify({"error": "No message provided"}), 400

#     try:
#         response = model.generate_content(question)
#         return jsonify({"response": response.text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@ai_bp.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("message", "")
    
    print("Incoming message:", question)
    print(" GOOGLE_API_KEY:", os.getenv("GOOGLE_API_KEY"))

    if not question:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = model.generate_content(question)
        print(" Gemini response:", response.text)
        return jsonify({"response": response.text})
    except Exception as e:
        print("Gemini ERROR:", e)
        return jsonify({"error": str(e)}), 500
