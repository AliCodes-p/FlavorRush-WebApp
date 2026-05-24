"""
Stub controllers for frontend API helpers not implemented in Express.
Returns safe defaults so React api.js calls do not break.
"""

from flask import request
from flask_jwt_extended import get_jwt_identity

from database.connection import get_db
from models import USERS
from utils.responses import error_response
from utils.serializers import serialize_doc


class ExtensionController:
    def payments_intent(self):
        data = request.get_json(silent=True) or {}
        amount = data.get('amount', 0)
        return {
            'clientSecret': 'mock_secret_placeholder',
            'amount': amount,
        }, 200

    def payments_confirm(self):
        return {'success': True, 'status': 'succeeded'}, 200

    def get_addresses(self):
        user = self._get_user()
        if not user:
            return error_response('Unauthorized', 401)
        return user.get('addresses', []), 200

    def create_address(self):
        return {'success': True, 'message': 'Address created'}, 201

    def update_address(self, address_id):
        return {'success': True, 'message': 'Address updated'}, 200

    def delete_address(self, address_id):
        return {'success': True, 'message': 'Address deleted'}, 200

    def set_default_address(self, address_id):
        return {'success': True, 'message': 'Default address set'}, 200

    def get_favorites(self):
        user = self._get_user()
        if not user:
            return [], 200
        return [str(f) for f in user.get('favorites', [])], 200

    def add_favorite(self):
        return {'success': True}, 200

    def remove_favorite(self, product_id):
        return {'success': True}, 200

    def check_favorite(self, product_id):
        return {'isFavorite': False}, 200

    def _get_user(self):
        user_id = get_jwt_identity()
        if not user_id:
            return None
        from bson import ObjectId

        try:
            doc = get_db()[USERS].find_one({'_id': ObjectId(user_id)}, {'password': 0})
            return serialize_doc(doc)
        except Exception:
            return None
