from datetime import datetime

from database.connection import get_db
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
    {
        'name': 'Spicy Chicken Wings',
        'category': 'starters',
        'price': 199,
        'image': 'https://images.pexels.com/photos/60616/food-chicken-wings-hot-60616.jpeg?auto=compress&cs=tinysrgb&w=500&h=500',
        'description': '8 pieces of our signature spicy wings with herbs',
        'rating': 4.6,
        'bestseller': False,
        'isSpicy': True,
        'spiceLevel': 4,
        'prepTime': '10 mins',
        'ingredients': ['Chicken Wings', 'Chili', 'Garlic', 'Herbs'],
        'nutrition': {'calories': 340, 'protein': '24g', 'fat': '18g', 'carbs': '8g'},
        'reviews': [],
        'createdAt': datetime.utcnow(),
    },
    {
        'name': 'Loaded Nachos',
        'category': 'starters',
        'price': 229,
        'image': '/images/products/loaded-nachos.png',
        'description': 'Crispy nachos with cheese, jalapeños, and sour cream',
        'rating': 4.6,
        'bestseller': False,
        'isSpicy': True,
        'spiceLevel': 2,
        'prepTime': '8 mins',
        'ingredients': ['Tortilla Chips', 'Cheese', 'Jalapeños', 'Sour Cream'],
        'nutrition': {'calories': 480, 'protein': '12g', 'fat': '26g', 'carbs': '52g'},
        'reviews': [],
        'createdAt': datetime.utcnow(),
    },
]


def ensure_seed_products() -> bool:
    db = get_db()
    if db[PRODUCTS].count_documents({}) > 0:
        return False

    db[PRODUCTS].insert_many(SAMPLE_PRODUCTS)
    print(f'[OK] Seeded {len(SAMPLE_PRODUCTS)} starter products')
    return True
