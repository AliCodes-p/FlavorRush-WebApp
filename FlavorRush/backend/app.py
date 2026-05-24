import sys
from pathlib import Path

# Ensure backend root is on Python path when running app.py directly
sys.path.insert(0, str(Path(__file__).resolve().parent))

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config.settings import Config
from database.connection import close_db, init_db
from middleware.error_handlers import register_error_handlers
from routes import register_blueprints


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(
        app,
        origins=config_class.CORS_ORIGINS,
        supports_credentials=True,
        allow_headers=['Content-Type', 'Authorization'],
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    )

    JWTManager(app)

    try:
        init_db(config_class.MONGODB_URI)
        app.logger.info('MongoDB connected')
    except Exception as exc:
        app.logger.error('MongoDB connection error: %s', exc)

    register_blueprints(app)
    register_error_handlers(app)

    @app.get('/api/health')
    def health_check():
        return jsonify({
            'status': 'OK',
            'message': 'FlavorRush API is running',
            'stack': 'Flask',
        })

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        pass

    return app


app = create_app()


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=Config.PORT,
        debug=Config.DEBUG,
    )
