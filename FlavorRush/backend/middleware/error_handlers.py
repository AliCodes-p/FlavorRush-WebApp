from flask import jsonify
from flask_jwt_extended.exceptions import JWTExtendedException
from jwt.exceptions import PyJWTError
from pymongo.errors import PyMongoError
from werkzeug.exceptions import HTTPException


def register_error_handlers(app):
    @app.errorhandler(400)
    @app.errorhandler(401)
    @app.errorhandler(404)
    def handle_http(err):
        if isinstance(err, HTTPException):
            return jsonify({'error': err.description}), err.code
        return jsonify({'error': 'Bad request'}), 400

    @app.errorhandler(JWTExtendedException)
    @app.errorhandler(PyJWTError)
    def handle_jwt(err):
        return jsonify({'error': 'Invalid token'}), 401

    @app.errorhandler(PyMongoError)
    def handle_mongo(err):
        app.logger.error('MongoDB error: %s', err)
        return jsonify({'error': 'Database error'}), 500

    @app.errorhandler(Exception)
    def handle_generic(err):
        app.logger.exception(err)
        return jsonify({'error': 'Something went wrong!'}), 500
