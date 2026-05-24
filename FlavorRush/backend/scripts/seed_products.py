"""
Seed sample products into MongoDB (optional).
Run from backend folder: python scripts/seed_products.py
"""

import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from config.settings import Config
from database.connection import close_db, init_db
from models import PRODUCTS

SAMPLE_PRODUCTS = [
    {
        'name': 'Crispy Chicken Burger',
        'category': 'burgers',
        'price': 299,
        'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
        'description': 'Juicy grilled chicken with crispy golden coating',
        'rating': 4.8,
        'bestseller': True,
        'isSpicy': True,
        'spiceLevel': 2,
        'prepTime': '15 mins',
        'ingredients': ['Chicken', 'Lettuce', 'Tomato', 'Cheese', 'Sauce'],
        'nutrition': {'calories': 520, 'protein': '28g', 'fat': '22g', 'carbs': '45g'},
        'reviews': [],
        'createdAt': datetime.utcnow(),
    },
    {
        'name': 'Classic Cheeseburger',
        'category': 'burgers',
        'price': 279,
        'image': 'https://images.unsplash.com/photo-1550547990-25967e7abb92?w=500&h=500&fit=crop',
        'description': 'Premium beef with melted cheese',
        'rating': 4.7,
        'bestseller': True,
        'isSpicy': False,
        'spiceLevel': 0,
        'prepTime': '12 mins',
        'reviews': [],
        'createdAt': datetime.utcnow(),
    },
]


def main():
    db = init_db(Config.MONGODB_URI)
    collection = db[PRODUCTS]
    collection.delete_many({})
    collection.insert_many(SAMPLE_PRODUCTS)
    print(f'Seeded {len(SAMPLE_PRODUCTS)} products into {PRODUCTS}')
    close_db()


if __name__ == '__main__':
    main()
