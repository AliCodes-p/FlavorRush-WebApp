from flask import Blueprint

from controllers.extension_controller import ExtensionController
from middleware.auth import jwt_required_user

extensions_bp = Blueprint('extensions', __name__)
controller = ExtensionController()


@extensions_bp.post('/payments/intent')
@jwt_required_user
def payment_intent():
    return controller.payments_intent()


@extensions_bp.post('/payments/confirm')
@jwt_required_user
def payment_confirm():
    return controller.payments_confirm()


@extensions_bp.get('/addresses')
@jwt_required_user
def get_addresses():
    return controller.get_addresses()


@extensions_bp.post('/addresses')
@jwt_required_user
def create_address():
    return controller.create_address()


@extensions_bp.put('/addresses/<address_id>')
@jwt_required_user
def update_address(address_id):
    return controller.update_address(address_id)


@extensions_bp.delete('/addresses/<address_id>')
@jwt_required_user
def delete_address(address_id):
    return controller.delete_address(address_id)


@extensions_bp.post('/addresses/<address_id>/default')
@jwt_required_user
def set_default_address(address_id):
    return controller.set_default_address(address_id)


@extensions_bp.get('/favorites')
@jwt_required_user
def get_favorites():
    return controller.get_favorites()


@extensions_bp.post('/favorites')
@jwt_required_user
def add_favorite():
    return controller.add_favorite()


@extensions_bp.delete('/favorites/<product_id>')
@jwt_required_user
def remove_favorite(product_id):
    return controller.remove_favorite(product_id)


@extensions_bp.get('/favorites/<product_id>/check')
@jwt_required_user
def check_favorite(product_id):
    return controller.check_favorite(product_id)
