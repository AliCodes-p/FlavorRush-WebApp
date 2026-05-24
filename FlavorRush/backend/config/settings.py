import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration loaded from environment variables."""

    PORT = int(os.getenv('PORT', 5000))
    DEBUG = os.getenv('FLASK_DEBUG', os.getenv('NODE_ENV', 'development')) == 'development'

    MONGODB_URI = os.getenv(
        'MONGODB_URI',
        'mongodb://localhost:27017/flavorRush',
    )

    JWT_SECRET_KEY = os.getenv('JWT_SECRET', 'your_jwt_secret_key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'

    CORS_ORIGINS = os.getenv(
        'CORS_ORIGINS',
        'http://localhost:5173,http://127.0.0.1:5173',
    ).split(',')

    STRIPE_SECRET = os.getenv('STRIPE_SECRET', '')
