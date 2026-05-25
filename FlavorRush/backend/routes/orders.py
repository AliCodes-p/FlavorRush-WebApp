from flask import Blueprint

from controllers.order_controller import OrderController
from middleware.auth import jwt_required_user

orders_bp = Blueprint('orders', __name__)
controller = OrderController()


@orders_bp.post('')
@orders_bp.post('/')
@jwt_required_user
def create_order():
    return controller.create()


@orders_bp.get('')
@orders_bp.get('/')
@jwt_required_user
def get_orders():
    return controller.get_all()


@orders_bp.get('/<order_id>')
@jwt_required_user
def get_order(order_id):
    return controller.get_by_id(order_id)


@orders_bp.get('/<order_id>/track')
@jwt_required_user
def track_order(order_id):
    return controller.track(order_id)


@orders_bp.post('/<order_id>/cancel')
@jwt_required_user
def cancel_order(order_id):
    return controller.cancel(order_id)
