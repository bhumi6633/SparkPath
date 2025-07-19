from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from routes.rides import rides_bp
    from routes.carbon import carbon_bp

    app.register_blueprint(rides_bp, url_prefix='/rides')
    app.register_blueprint(carbon_bp, url_prefix='/carbon')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

    
