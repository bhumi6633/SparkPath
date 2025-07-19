import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
    response = model.generate_content("Hello Gemini! Are you working?")
    print("RESPONSE:", response.text)
except Exception as e:
    print("ERROR:", e)
