from flask import Flask
from flask_cors import CORS
import os
from routes.rides import rides_bp
from routes.carbon import carbon_bp
from routes.time import time_bp
from routes.ai import ai_bp
from routes.stations import stations_bp
from routes.summary import summary_bp

from dotenv import load_dotenv
# Load .env

load_dotenv(override=True)
os.environ["GOOGLE_MAPS_API_KEY"] = os.getenv("GOOGLE_MAPS_API_KEY")

load_dotenv()
def create_app():
    app = Flask(__name__)
    CORS(app)


    app.register_blueprint(rides_bp, url_prefix='/rides')
    app.register_blueprint(carbon_bp, url_prefix='/carbon')
    app.register_blueprint(time_bp, url_prefix='/time')
    app.register_blueprint(ai_bp, url_prefix='/ai')
    app.register_blueprint(stations_bp, url_prefix='/stations')
    app.register_blueprint(summary_bp, url_prefix='/summary')

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=True)


    
