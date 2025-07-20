from flask import Blueprint, request, jsonify
from flask_cors import cross_origin 
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

ai_bp = Blueprint('ai', __name__)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@ai_bp.route('/ask', methods=['POST', 'OPTIONS'])
@cross_origin(origins='/*', supports_credentials=True)  
def ask_ecobot():
    if request.method == 'OPTIONS':
        return '', 204

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
