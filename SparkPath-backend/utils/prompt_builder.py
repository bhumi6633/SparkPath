
def build_prompt(from_location, to_location, ride_type):
    return f"You are a sustainable ride assistant. A user wants to go from {from_location} to {to_location} using a {ride_type} ride. Generate a short description of how this helps the environment and saves CO₂."
