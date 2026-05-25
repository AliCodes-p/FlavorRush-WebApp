from flask import request

from middleware.auth import get_current_user_id
from services.order_service import OrderService
from utils.responses import error_response


class OrderController:
    def __init__(self):
        self.service = OrderService()

    def create(self):
        data = request.get_json(silent=True) or {}
        user_id = get_current_user_id()
        if not user_id:
            return error_response('Authentication required', 401)

        result, error = self.service.create(user_id, data)
        if error:
            return error_response(error, 400)
        return result, 201

    def get_all(self):
        user_id = get_current_user_id()
        if not user_id:
            return error_response('Authentication required', 401)
        return self.service.get_all(user_id), 200

    def get_by_id(self, order_id):
        user_id = get_current_user_id()
        order = self.service.get_by_id(order_id)
        if not order:
            return error_response('Order not found', 404)

        order_user = str(order.get('userId', ''))
        if user_id and order_user and order_user != str(user_id):
            return error_response('Order not found', 404)

        return order, 200

    def track(self, order_id):
        user_id = get_current_user_id()
        tracking = self.service.track(order_id)
        if not tracking:
            return error_response('Order not found', 404)

        order = self.service.get_by_id(order_id)
        if order and user_id:
            order_user = str(order.get('userId', ''))
            if order_user and order_user != str(user_id):
                return error_response('Order not found', 404)

        return tracking, 200

    def cancel(self, order_id):
        user_id = get_current_user_id()
        order = self.service.get_by_id(order_id)
        if not order:
            return error_response('Order not found', 404)
        if user_id:
            order_user = str(order.get('userId', ''))
            if order_user and order_user != str(user_id):
                return error_response('Order not found', 404)

        result, error = self.service.cancel(order_id)
        if error:
            return error_response(error, 404)
        return result, 200
