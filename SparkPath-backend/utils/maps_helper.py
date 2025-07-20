import requests

ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFlNjczY2RiZWY4ZjQyZGU5ZWUyNjdmMTg5NWZiYjM0IiwiaCI6Im11cm11cjY0In0="

def get_distance_and_duration(pickup, dropoff):
    try:
        url = "https://api.openrouteservice.org/v2/directions/driving-car"
        headers = {
            "Authorization": ORS_API_KEY,
            "Content-Type": "application/json"
        }

        body = {
            "coordinates": [pickup, dropoff],
            "units": "km"
        }

        response = requests.post(url, json=body, headers=headers)
        response.raise_for_status()
        data = response.json()

        summary = data["features"][0]["properties"]["summary"]
        distance = round(summary["distance"], 2)
        duration = round(summary["duration"] / 60, 1)

        return {
            "distance_km": distance,
            "duration_minutes": duration
        }

    except Exception as e:
        print("Error fetching route:", e)
        return None
