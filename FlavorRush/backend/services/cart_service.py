"""
Cart service — preserves Express mock API responses for frontend compatibility.
Optional JWT attaches cart to user in MongoDB when authenticated.
"""

from datetime import datetime

from bson import ObjectId

from database.connection import get_db
from models import CARTS, PRODUCTS


class CartService:
    def __init__(self):
        self._anonymous: dict[str, list] = {}

    @staticmethod
    def _carts():
        return get_db()[CARTS]

    def _get_cart_doc(self, user_id: str | None) -> dict:
        if user_id:
            cart = self._carts().find_one({'userId': user_id})
            if not cart:
                cart = {'userId': user_id, 'items': [], 'updatedAt': datetime.utcnow()}
                self._carts().insert_one(cart)
            return cart
        return {'items': self._anonymous.get('guest', [])}

    def _save_cart(self, user_id: str | None, items: list) -> None:
        if user_id:
            self._carts().update_one(
                {'userId': user_id},
                {'$set': {'items': items, 'updatedAt': datetime.utcnow()}},
                upsert=True,
            )
        else:
            self._anonymous['guest'] = items

    def get_cart(self, user_id: str | None = None) -> dict:
        cart = self._get_cart_doc(user_id)
        return {'items': cart.get('items', [])}

    def add_item(
        self,
        product_id: str,
        quantity: int = 1,
        customizations: dict | None = None,
        user_id: str | None = None,
    ) -> dict:
        cart = self._get_cart_doc(user_id)
        items = list(cart.get('items', []))

        try:
            product = get_db()[PRODUCTS].find_one({'_id': ObjectId(product_id)})
        except Exception:
            product = None

        item = {
            'productId': product_id,
            'quantity': quantity or 1,
            'customizations': customizations or {},
        }
        if product:
            item['name'] = product.get('name')
            item['price'] = product.get('price')
            item['image'] = product.get('image')

        items.append(item)
        self._save_cart(user_id, items)
        return {'success': True, 'message': 'Item added to cart'}

    def update_item(self, item_id: str, quantity: int, user_id: str | None = None) -> dict:
        cart = self._get_cart_doc(user_id)
        items = cart.get('items', [])
        try:
            idx = int(item_id)
            if 0 <= idx < len(items):
                items[idx]['quantity'] = quantity
                self._save_cart(user_id, items)
        except ValueError:
            pass
        return {'success': True, 'message': 'Quantity updated'}

    def remove_item(self, item_id: str, user_id: str | None = None) -> dict:
        cart = self._get_cart_doc(user_id)
        items = cart.get('items', [])
        try:
            idx = int(item_id)
            if 0 <= idx < len(items):
                items.pop(idx)
                self._save_cart(user_id, items)
        except ValueError:
            pass
        return {'success': True, 'message': 'Item removed'}

    def clear_cart(self, user_id: str | None = None) -> dict:
        self._save_cart(user_id, [])
        return {'success': True, 'message': 'Cart cleared'}
