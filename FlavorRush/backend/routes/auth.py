from flask import Blueprint

from controllers.auth_controller import AuthController
from middleware.auth import jwt_required_user

auth_bp = Blueprint('auth', __name__)
controller = AuthController()


@auth_bp.post('/signup')
def signup():
    return controller.signup()


@auth_bp.post('/login')
def login():
    return controller.login()


@auth_bp.get('/profile')
@jwt_required_user
def profile():
    return controller.profile()


@auth_bp.put('/profile')
@jwt_required_user
def update_profile():
    return controller.update_profile()


@auth_bp.post('/logout')
@jwt_required_user
def logout():
    return controller.logout()
