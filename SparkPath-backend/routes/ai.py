from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os

ai_bp = Blueprint("ai", __name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

@ai_bp.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    message = data.get("message", "")
    response = model.generate_content(message)
    return jsonify({"reply": response.text})
