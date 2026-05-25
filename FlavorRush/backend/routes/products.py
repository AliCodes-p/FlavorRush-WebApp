from flask import Blueprint

from controllers.product_controller import ProductController
from middleware.auth import jwt_required_user

products_bp = Blueprint('products', __name__)
controller = ProductController()


@products_bp.get('/search')
def search_products():
    return controller.search()


@products_bp.get('')
@products_bp.get('/')
def get_products():
    return controller.get_all()


@products_bp.get('/<product_id>')
def get_product(product_id):
    return controller.get_by_id(product_id)


@products_bp.get('/<product_id>/reviews')
def get_reviews(product_id):
    return controller.get_reviews(product_id)


@products_bp.post('/<product_id>/reviews')
@jwt_required_user
def create_review(product_id):
    return controller.create_review(product_id)
