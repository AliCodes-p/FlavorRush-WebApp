from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask_jwt_extended.exceptions import JWTExtendedException
from jwt.exceptions import PyJWTError


def jwt_required_user(fn):
    """Require valid JWT; matches Express Bearer token behavior."""

    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except (JWTExtendedException, PyJWTError):
            return jsonify({'error': 'Invalid token'}), 401
        return fn(*args, **kwargs)

    return wrapper


def jwt_optional(fn):
    """Attach user id when token present; allow anonymous access."""

    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request(optional=True)
            kwargs['user_id'] = get_jwt_identity()
        except (JWTExtendedException, PyJWTError):
            kwargs['user_id'] = None
        return fn(*args, **kwargs)

    return wrapper


def get_current_user_id() -> str | None:
    try:
        verify_jwt_in_request(optional=True)
        return get_jwt_identity()
    except (JWTExtendedException, PyJWTError):
        return None
