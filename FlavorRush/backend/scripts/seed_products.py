"""
Seed sample products into MongoDB (optional).
Run from backend folder: python scripts/seed_products.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from config.settings import Config
from database.connection import close_db, init_db
from database.seed import ensure_seed_products


def main():
    init_db(Config.MONGO_URI)
    ensure_seed_products()
    close_db()


if __name__ == '__main__':
    main()
