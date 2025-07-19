import os
from dotenv import load_dotenv

load_dotenv()
print("ENV in maps_helper:", os.getenv("GOOGLE_MAPS_API_KEY"))