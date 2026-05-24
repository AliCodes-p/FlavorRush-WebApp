from flask import Blueprint

from controllers.cart_controller import CartController

cart_bp = Blueprint('cart', __name__)
controller = CartController()


@cart_bp.get('/')
def get_cart():
    return controller.get_cart()


@cart_bp.post('/add')
def add_to_cart():
    return controller.add_item()


@cart_bp.put('/items/<item_id>')
def update_item(item_id):
    return controller.update_item(item_id)


@cart_bp.delete('/items/<item_id>')
def remove_item(item_id):
    return controller.remove_item(item_id)


@cart_bp.delete('/')
def clear_cart():
    return controller.clear_cart()
