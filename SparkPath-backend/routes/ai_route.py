# utils/ai_route.py

from eco_gemini import ask_gemini  # your Gemini 

def interpret_route_preferences(user_prompt):
    system_prompt = (
        "You're an assistant that maps route preferences into JSON parameters "
        "for OpenRouteService API. Respond in JSON with keys: profile, avoid_features, and preference."
    )
    user_message = f"User wants: {user_prompt}"

    response = ask_gemini(system_prompt, user_message)

    try:
        json_start = response.find('{')
        json_data = response[json_start:]
        return eval(json_data)  # Optional: use `json.loads` after validation
    except Exception as e:
        print(" AI route parsing error:", e)
        return {
            "profile": "driving-car",
            "avoid_features": [],
            "preference": "fastest"
        }
