import requests
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def get_distance_and_duration(pickup, dropoff):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    params = {
        "origins": pickup,
        "destinations": dropoff,
        "mode": "driving",
        "key": GOOGLE_MAPS_API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()

    # print("Request URL", response.url)
    # print("API rsp: ", response.json())

    if data['status'] != "OK" or not data["rows"]:
        return None

    element = data["rows"][0]["elements"][0]
    if element['status'] != "OK":
        return None 
    
    distance_meters = element["distance"]["value"]
    duration_sec = element["duration"]["value"]

    return{
        "distance_km": round(distance_meters/1000,2),
        "duration_min": round(duration_sec/60,1)
    }

