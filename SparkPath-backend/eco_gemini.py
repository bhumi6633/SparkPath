import google.generativeai as genai
import os

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)


#here we are combining the user ride summary with user que and getting a response
def ask_gemini(prompt_summary, user_question):
    model = genai.GenerativeModel('gemini-2.0-flash')
    chat = model.start_chat()

    full_prompt = f"""
You are EcoBot+, an AI assistant in the EcoRoute EV rideshare app.
Here is the user’s ride summary:
{prompt_summary}
[User Question]
{user_question}
"""
    
    response = chat.send_message(full_prompt)
    return response.text


