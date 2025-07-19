def format_ride_summary(data):
    #coverting from json to natural lang summary..

    model = data.get("model", "vehicle")
    distance = data.get("distance_km", 0)
    duration = data.get("duration_minutes", 0)
    co2 = data.get("co2_saved_kg", 0)
    trees = data.get("trees_saved", 0)
    passengers = data.get("passengers", 1)

    summary = f"You’ve been matched with a {model} for a {distance} km ride taking approximately {duration} minutes."

    if passengers > 1:
        summary += f" Because you’re pooling with {passengers} passengers, your carbon savings were boosted!"

    summary += f" This ride saved {co2} kg of CO₂ — that’s like planting {trees} trees! 🌱"

    return summary

