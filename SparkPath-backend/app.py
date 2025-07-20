from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from pymongo import MongoClient

from routes.find_ride import find_ride_bp
from routes.rides import rides_bp
from routes.carbon import carbon_bp
from routes.time import time_bp
from routes.ai import ai_bp
from routes.ors import ors_bp
from routes.profile import profile_bp
from routes.dashboard import dashboard_bp
from routes.stations import stations_bp
from routes.summary import summary_bp
from routes.auth import auth_bp

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

def create_app():
    app = Flask(__name__)
    CORS(app)

    # MongoDB setup
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client["sparkpath"]
    app.db = db

    # Register blueprints
    app.register_blueprint(profile_bp, url_prefix='/profile')
    app.register_blueprint(rides_bp, url_prefix='/rides')
    app.register_blueprint(carbon_bp, url_prefix='/carbon')
    app.register_blueprint(time_bp, url_prefix='/time')
    app.register_blueprint(ai_bp, url_prefix='/ai')
    app.register_blueprint(ors_bp, url_prefix="/ors")
    app.register_blueprint(stations_bp, url_prefix='/stations')
    app.register_blueprint(summary_bp, url_prefix='/summary')
    app.register_blueprint(dashboard_bp, url_prefix="/dashboard")
    app.register_blueprint(find_ride_bp, url_prefix='/rides')
    app.register_blueprint(auth_bp)

    return app

# Create app instance
app = create_app()

# Test DB connection
@app.route("/test-db")
def test_db():
    try:
        collections = app.db.list_collection_names()
        return {"status": "connected", "collections": collections}
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

if __name__ == '__main__':
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=True, port=port)
