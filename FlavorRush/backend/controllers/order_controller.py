from flask import request
from flask_jwt_extended import get_jwt_identity

from middleware.auth import get_current_user_id
from services.order_service import OrderService
from utils.responses import error_response


class OrderController:
    def __init__(self):
        self.service = OrderService()

    def create(self):
        data = request.get_json(silent=True) or {}
        result, error = self.service.create(data)
        if error:
            return error_response(error, 400)
        return result, 200

    def get_all(self):
        user_id = get_current_user_id()
        return self.service.get_all(user_id), 200

    def get_by_id(self, order_id):
        order = self.service.get_by_id(order_id)
        if not order:
            return error_response('Order not found', 404)
        return order, 200

    def track(self, order_id):
        tracking = self.service.track(order_id)
        if not tracking:
            return error_response('Order not found', 404)
        return tracking, 200

    def cancel(self, order_id):
        result, error = self.service.cancel(order_id)
        if error:
            return error_response(error, 404)
        return result, 200
