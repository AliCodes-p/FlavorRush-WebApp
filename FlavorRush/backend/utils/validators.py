import re
from typing import Any


EMAIL_REGEX = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')


def require_fields(data: dict, fields: list[str]) -> str | None:
    for field in fields:
        if field not in data or data[field] in (None, ''):
            return f'{field} is required'
    return None


def validate_email(email: str) -> str | None:
    if not EMAIL_REGEX.match(email or ''):
        return 'Invalid email address'
    return None


def validate_password(password: str, min_length: int = 6) -> str | None:
    if not password or len(password) < min_length:
        return f'Password must be at least {min_length} characters'
    return None


def validate_object_id(value: Any) -> str | None:
    from bson import ObjectId
    from bson.errors import InvalidId

    try:
        ObjectId(str(value))
        return None
    except (InvalidId, TypeError):
        return 'Invalid ID format'
