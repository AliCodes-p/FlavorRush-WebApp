from flask import request

from middleware.auth import get_current_user_id
from services.cart_service import CartService
from utils.responses import error_response
from utils.validators import require_fields


# Shared cart service instance (in-memory guest cart)
_cart_service = CartService()


class CartController:
    def __init__(self):
        self.service = _cart_service

    def get_cart(self):
        user_id = get_current_user_id()
        return self.service.get_cart(user_id), 200

    def add_item(self):
        data = request.get_json(silent=True) or {}
        err = require_fields(data, ['productId'])
        if err:
            return error_response(err, 400)

        user_id = get_current_user_id()
        result = self.service.add_item(
            data['productId'],
            data.get('quantity', 1),
            data.get('customizations'),
            user_id,
        )
        return result, 200

    def update_item(self, item_id):
        data = request.get_json(silent=True) or {}
        user_id = get_current_user_id()
        result = self.service.update_item(
            item_id,
            data.get('quantity', 1),
            user_id,
        )
        return result, 200

    def remove_item(self, item_id):
        user_id = get_current_user_id()
        return self.service.remove_item(item_id, user_id), 200

    def clear_cart(self):
        user_id = get_current_user_id()
        return self.service.clear_cart(user_id), 200
