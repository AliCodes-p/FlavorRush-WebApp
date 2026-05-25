from flask import request
from flask_jwt_extended import get_jwt_identity

from services.auth_service import AuthService
from utils.responses import error_response
from utils.validators import require_fields, validate_email, validate_password


class AuthController:
    def __init__(self):
        self.service = AuthService()

    def signup(self):
        data = request.get_json(silent=True) or {}
        err = require_fields(data, ['name', 'email', 'password'])
        if err:
            return error_response(err, 400)
        err = validate_email(data['email']) or validate_password(data['password'])
        if err:
            return error_response(err, 400)

        result, error = self.service.signup(
            data['name'],
            data['email'],
            data['password'],
        )
        if error:
            return error_response(error, 400)
        return result, 200

    def login(self):
        data = request.get_json(silent=True) or {}
        err = require_fields(data, ['email', 'password'])
        if err:
            return error_response(err, 400)

        result, error = self.service.login(data['email'], data['password'])
        if error:
            return error_response(error, 400)
        return result, 200

    def profile(self):
        user_id = get_jwt_identity()
        result, error = self.service.get_profile(user_id)
        if error:
            return error_response(error, 400)
        return result, 200

    def update_profile(self):
        user_id = get_jwt_identity()
        data = request.get_json(silent=True) or {}
        result, error = self.service.update_profile(user_id, data)
        if error:
            return error_response(error, 400)
        return result, 200

    def logout(self):
        return self.service.logout(), 200
