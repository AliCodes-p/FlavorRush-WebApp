"""
Cart service — per-user MongoDB cart when authenticated; in-memory guest cart otherwise.
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

    @staticmethod
    def _user_key(user_id: str | None) -> str | None:
        if not user_id:
            return None
        return str(user_id)

    def _get_cart_doc(self, user_id: str | None) -> dict:
        key = self._user_key(user_id)
        if key:
            cart = self._carts().find_one({'userId': key})
            if not cart:
                cart = {
                    'userId': key,
                    'items': [],
                    'updatedAt': datetime.utcnow(),
                }
                self._carts().insert_one(cart)
            return cart
        return {'items': self._anonymous.get('guest', [])}

    def _save_cart(self, user_id: str | None, items: list) -> None:
        key = self._user_key(user_id)
        if key:
            self._carts().update_one(
                {'userId': key},
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
        customizations = customizations or {}

        try:
            product = get_db()[PRODUCTS].find_one({'_id': ObjectId(product_id)})
        except Exception:
            product = None

        product_key = str(product_id)
        custom_key = str(sorted(customizations.items()))

        merged = False
        for existing in items:
            if (
                str(existing.get('productId')) == product_key
                and str(sorted((existing.get('customizations') or {}).items())) == custom_key
            ):
                existing['quantity'] = int(existing.get('quantity', 1)) + (quantity or 1)
                merged = True
                break

        if not merged:
            item = {
                'productId': product_key,
                'quantity': quantity or 1,
                'customizations': customizations,
            }
            if product:
                item['name'] = product.get('name')
                item['price'] = product.get('price')
                item['image'] = product.get('image')
            items.append(item)

        self._save_cart(user_id, items)
        return {'success': True, 'message': 'Item added to cart', 'items': items}

    def update_item(self, item_id: str, quantity: int, user_id: str | None = None) -> dict:
        cart = self._get_cart_doc(user_id)
        items = list(cart.get('items', []))
        try:
            idx = int(item_id)
            if 0 <= idx < len(items):
                if quantity <= 0:
                    items.pop(idx)
                else:
                    items[idx]['quantity'] = quantity
                self._save_cart(user_id, items)
        except ValueError:
            pass
        return {'success': True, 'message': 'Quantity updated', 'items': items}

    def remove_item(self, item_id: str, user_id: str | None = None) -> dict:
        cart = self._get_cart_doc(user_id)
        items = list(cart.get('items', []))
        try:
            idx = int(item_id)
            if 0 <= idx < len(items):
                items.pop(idx)
                self._save_cart(user_id, items)
        except ValueError:
            pass
        return {'success': True, 'message': 'Item removed', 'items': items}

    def clear_cart(self, user_id: str | None = None) -> dict:
        self._save_cart(user_id, [])
        return {'success': True, 'message': 'Cart cleared', 'items': []}
