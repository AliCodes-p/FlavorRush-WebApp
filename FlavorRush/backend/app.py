import sys
from pathlib import Path

# Ensure backend root is on Python path when running app.py directly
sys.path.insert(0, str(Path(__file__).resolve().parent))

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config.settings import Config
from database.connection import init_db
from database.seed import ensure_seed_products
from middleware.error_handlers import register_error_handlers
from routes import register_blueprints


def create_app(config_class=Config):
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(config_class)

    CORS(
        app,
        origins=config_class.CORS_ORIGINS,
        supports_credentials=True,
        allow_headers=['Content-Type', 'Authorization'],
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        expose_headers=['Content-Type'],
    )

    JWTManager(app)

    try:
        init_db(config_class.MONGO_URI)
        app.config['MONGO_READY'] = True
        ensure_seed_products()
        app.logger.info('MongoDB connected successfully')
    except Exception as exc:
        app.config['MONGO_READY'] = False
        app.logger.error('MongoDB connection error: %s', exc)

    register_blueprints(app)
    register_error_handlers(app)

    @app.get('/api/health')
    def health_check():
        return jsonify({
            'status': 'OK' if app.config.get('MONGO_READY') else 'DEGRADED',
            'message': 'FlavorRush API is running',
            'database': 'connected' if app.config.get('MONGO_READY') else 'disconnected',
            'stack': 'Flask',
        })

    return app


app = create_app()


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=Config.PORT,
        debug=Config.DEBUG,
    )
