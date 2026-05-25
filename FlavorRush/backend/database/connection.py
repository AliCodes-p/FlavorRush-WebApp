from urllib.parse import urlparse

from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import ConfigurationError, InvalidURI, PyMongoError

_client: MongoClient | None = None
_db: Database | None = None


def _database_name(uri: str) -> str:
    parsed = urlparse(uri)
    path = parsed.path.lstrip('/')
    if path:
        return path.split('?')[0]
    return 'flavorRush'


def init_db(uri: str | None) -> Database:
    """Initialize MongoDB connection and validate the URI."""
    global _client, _db

    if not uri:
        raise ValueError('MONGO_URI is not set. Add it to your .env file.')

    try:
        _client = MongoClient(
            uri,
            serverSelectionTimeoutMS=5000,
            uuidRepresentation='standard',
        )
        _db = _client[_database_name(uri)]
        _client.admin.command('ping')
    except (InvalidURI, ConfigurationError, PyMongoError) as exc:
        _client = None
        _db = None
        raise RuntimeError(f'MongoDB connection failed: {exc}') from exc

    print(f'[OK] MongoDB connected successfully to database: {_db.name}')
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
