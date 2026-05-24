from flask import request

from services.product_service import ProductService
from utils.responses import error_response


class ProductController:
    def __init__(self):
        self.service = ProductService()

    def get_all(self):
        products = self.service.get_all(
            category=request.args.get('category'),
            search=request.args.get('search'),
            sort_by=request.args.get('sortBy'),
        )
        return products, 200

    def search(self):
        query = request.args.get('q', '')
        products = self.service.search(query)
        return products, 200

    def get_by_id(self, product_id):
        product = self.service.get_by_id(product_id)
        if not product:
            return error_response('Product not found', 404)
        return product, 200

    def get_reviews(self, product_id):
        reviews = self.service.get_reviews(product_id)
        if reviews is None:
            return error_response('Product not found', 404)
        return reviews, 200

    def create_review(self, product_id):
        data = request.get_json(silent=True) or {}
        review, error = self.service.add_review(product_id, data)
        if error:
            return error_response(error, 404)
        return review, 201
