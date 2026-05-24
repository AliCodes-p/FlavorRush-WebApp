from datetime import datetime
from typing import Any

from bson import ObjectId


def _convert_value(value: Any) -> Any:
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, dict):
        return {k: _convert_value(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_convert_value(item) for item in value]
    return value


def serialize_doc(doc: dict | None) -> dict | None:
    """Convert MongoDB document to JSON-serializable dict (Mongoose-compatible)."""
    if doc is None:
        return None
    result = _convert_value(doc)
    if '_id' in result:
        oid = result['_id']
        result['id'] = oid
        result['_id'] = oid
    return result


def serialize_docs(docs: list[dict]) -> list[dict]:
    return [serialize_doc(doc) for doc in docs if doc is not None]
