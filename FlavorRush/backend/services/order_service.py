from datetime import datetime, timedelta

from bson import ObjectId
from bson.errors import InvalidId

from database.connection import get_db
from models import ORDERS
from utils.serializers import serialize_doc, serialize_docs


class OrderService:
    @staticmethod
    def _orders():
        return get_db()[ORDERS]

    @staticmethod
    def _normalize_user_id(user_id: str):
        if user_id and ObjectId.is_valid(str(user_id)):
            return ObjectId(user_id)
        return user_id

    def _find_order_doc(self, order_id: str) -> dict | None:
        """Resolve order by MongoDB _id or human-readable orderId (e.g. ORD-123)."""
        if not order_id:
            return None

        if ObjectId.is_valid(str(order_id)):
            order = self._orders().find_one({'_id': ObjectId(order_id)})
            if order:
                return order

        return self._orders().find_one({'orderId': order_id})

    def create(self, user_id: str, data: dict) -> tuple[dict | None, str | None]:
        items = data.get('items', [])
        delivery_address = data.get('deliveryAddress', {})
        total = data.get('total', 0)
        payment_method = data.get('paymentMethod', 'card')
        delivery_type = delivery_address.get('deliveryType', 'standard')

        if not items:
            return None, 'items are required'

        if not delivery_address.get('address'):
            return None, 'delivery address is required'

        order_doc = {
            'orderId': f'ORD-{int(datetime.utcnow().timestamp() * 1000)}',
            'userId': self._normalize_user_id(user_id),
            'items': items,
            'deliveryAddress': delivery_address,
            'deliveryType': delivery_type,
            'paymentMethod': payment_method,
            'total': float(total) if total is not None else 0,
            'status': 'pending',
            'estimatedDeliveryTime': datetime.utcnow() + timedelta(minutes=35),
            'deliveryPartner': None,
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow(),
        }

        result = self._orders().insert_one(order_doc)
        order_doc['_id'] = result.inserted_id
        return {'success': True, 'order': serialize_doc(order_doc)}, None

    def get_all(self, user_id: str | None = None) -> list[dict]:
        query = {}
        if user_id:
            query['userId'] = self._normalize_user_id(user_id)
        orders = list(self._orders().find(query).sort('createdAt', -1))
        return serialize_docs(orders)

    def get_by_id(self, order_id: str) -> dict | None:
        order = self._find_order_doc(order_id)
        return serialize_doc(order)

    def track(self, order_id: str) -> dict | None:
        order = self._find_order_doc(order_id)
        if not order:
            return None
        serialized = serialize_doc(order)
        return {
            'status': serialized.get('status'),
            'estimatedTime': serialized.get('estimatedDeliveryTime'),
            'deliveryPartner': serialized.get('deliveryPartner'),
            'orderId': serialized.get('orderId'),
            'id': serialized.get('id'),
        }

    def cancel(self, order_id: str) -> tuple[dict | None, str | None]:
        order = self._find_order_doc(order_id)
        if not order:
            return None, 'Order not found'

        result = self._orders().find_one_and_update(
            {'_id': order['_id']},
            {'$set': {'status': 'cancelled', 'updatedAt': datetime.utcnow()}},
            return_document=True,
        )
        if not result:
            return None, 'Order not found'
        return {'success': True, 'order': serialize_doc(result)}, None
