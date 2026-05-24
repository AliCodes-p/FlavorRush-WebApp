import re

from bson import ObjectId
from bson.errors import InvalidId

from database.connection import get_db
from models import PRODUCTS
from utils.serializers import serialize_doc, serialize_docs


class ProductService:
    @staticmethod
    def _products():
        return get_db()[PRODUCTS]

    def get_all(self, category=None, search=None, sort_by=None) -> list[dict]:
        query = {}
        if category:
            query['category'] = category
        if search:
            query['name'] = {'$regex': search, '$options': 'i'}

        products = list(self._products().find(query))

        if sort_by == 'price-asc':
            products.sort(key=lambda p: p.get('price', 0))
        elif sort_by == 'price-desc':
            products.sort(key=lambda p: p.get('price', 0), reverse=True)
        elif sort_by == 'rating':
            products.sort(key=lambda p: p.get('rating', 0), reverse=True)

        return serialize_docs(products)

    def get_by_id(self, product_id: str) -> dict | None:
        try:
            oid = ObjectId(product_id)
        except (InvalidId, TypeError):
            return None
        product = self._products().find_one({'_id': oid})
        return serialize_doc(product)

    def search(self, query: str) -> list[dict]:
        if not query:
            return []
        pattern = re.escape(query)
        products = list(
            self._products().find({
                '$or': [
                    {'name': {'$regex': pattern, '$options': 'i'}},
                    {'description': {'$regex': pattern, '$options': 'i'}},
                ],
            })
        )
        return serialize_docs(products)

    def get_reviews(self, product_id: str) -> list[dict]:
        product = self.get_by_id(product_id)
        if not product:
            return None
        return product.get('reviews', [])

    def add_review(self, product_id: str, review_data: dict) -> tuple[dict | None, str | None]:
        try:
            oid = ObjectId(product_id)
        except (InvalidId, TypeError):
            return None, 'Product not found'

        from datetime import datetime

        review = {
            'rating': review_data.get('rating'),
            'comment': review_data.get('comment', ''),
            'createdAt': datetime.utcnow(),
        }
        if review_data.get('userId'):
            review['userId'] = review_data['userId']

        result = self._products().update_one(
            {'_id': oid},
            {'$push': {'reviews': review}},
        )
        if result.matched_count == 0:
            return None, 'Product not found'
        return review, None
