import os
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()
import os
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content("What is sustainable transportation?")
print(response.text)
