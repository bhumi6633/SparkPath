import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def ask_gemini(prompt_summary, user_question):
    full_prompt = f"""
You are EcoBot+, an AI assistant in the EcoRoute EV rideshare app.

Here is the user’s ride summary:
{prompt_summary}

[User Question]
{user_question}
"""
    model = genai.GenerativeModel(model_name="gemini-pro")
    response = model.generate_content(full_prompt)
    return response.text


