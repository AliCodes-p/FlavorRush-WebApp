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

    def create(self, data: dict) -> tuple[dict | None, str | None]:
        user_id = data.get('userId')
        items = data.get('items', [])
        delivery_address = data.get('deliveryAddress', {})
        total = data.get('total', 0)

        if not user_id or not items:
            return None, 'userId and items are required'

        order_doc = {
            'orderId': f'ORD-{int(datetime.utcnow().timestamp() * 1000)}',
            'userId': ObjectId(user_id) if ObjectId.is_valid(str(user_id)) else user_id,
            'items': items,
            'deliveryAddress': delivery_address,
            'total': total,
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
        if user_id and ObjectId.is_valid(user_id):
            query['userId'] = ObjectId(user_id)
        orders = list(self._orders().find(query).sort('createdAt', -1))
        return serialize_docs(orders)

    def get_by_id(self, order_id: str) -> dict | None:
        try:
            oid = ObjectId(order_id)
        except (InvalidId, TypeError):
            return None
        order = self._orders().find_one({'_id': oid})
        return serialize_doc(order)

    def track(self, order_id: str) -> dict | None:
        order = self.get_by_id(order_id)
        if not order:
            return None
        return {
            'status': order.get('status'),
            'estimatedTime': order.get('estimatedDeliveryTime'),
            'deliveryPartner': order.get('deliveryPartner'),
        }

    def cancel(self, order_id: str) -> tuple[dict | None, str | None]:
        try:
            oid = ObjectId(order_id)
        except (InvalidId, TypeError):
            return None, 'Order not found'

        result = self._orders().find_one_and_update(
            {'_id': oid},
            {'$set': {'status': 'cancelled', 'updatedAt': datetime.utcnow()}},
            return_document=True,
        )
        if not result:
            return None, 'Order not found'
        return {'success': True, 'order': serialize_doc(result)}, None
