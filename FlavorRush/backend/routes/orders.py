from flask import Blueprint

from controllers.order_controller import OrderController

orders_bp = Blueprint('orders', __name__)
controller = OrderController()


@orders_bp.post('/')
def create_order():
    return controller.create()


@orders_bp.get('/')
def get_orders():
    return controller.get_all()


@orders_bp.get('/<order_id>')
def get_order(order_id):
    return controller.get_by_id(order_id)


@orders_bp.get('/<order_id>/track')
def track_order(order_id):
    return controller.track(order_id)


@orders_bp.post('/<order_id>/cancel')
def cancel_order(order_id):
    return controller.cancel(order_id)
