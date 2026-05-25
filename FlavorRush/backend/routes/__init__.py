from routes.auth import auth_bp
from routes.cart import cart_bp
from routes.database import db_bp
from routes.extensions import extensions_bp
from routes.orders import orders_bp
from routes.products import products_bp


def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    app.register_blueprint(extensions_bp, url_prefix='/api')
    app.register_blueprint(db_bp, url_prefix='/api/database')


__all__ = ['register_blueprints']
