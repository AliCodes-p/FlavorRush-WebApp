from urllib.parse import urlparse

from pymongo import MongoClient
from pymongo.database import Database

_client: MongoClient | None = None
_db: Database | None = None


def _database_name(uri: str) -> str:
    parsed = urlparse(uri)
    path = parsed.path.lstrip('/')
    if path:
        return path.split('?')[0]
    return 'flavorRush'


def init_db(uri: str) -> Database:
    """Initialize MongoDB connection."""
    global _client, _db
    _client = MongoClient(uri)
    _db = _client[_database_name(uri)]
    return _db


def get_db() -> Database:
    if _db is None:
        raise RuntimeError('Database not initialized. Call init_db() first.')
    return _db


def close_db() -> None:
    global _client, _db
    if _client is not None:
        _client.close()
    _client = None
    _db = None
