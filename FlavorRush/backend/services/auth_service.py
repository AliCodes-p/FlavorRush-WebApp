from datetime import datetime

import bcrypt
from bson import ObjectId
from flask_jwt_extended import create_access_token

from database.connection import get_db
from models import USERS
from utils.serializers import serialize_doc


class AuthService:
    @staticmethod
    def _users():
        return get_db()[USERS]

    @staticmethod
    def _hash_password(password: str) -> str:
        return bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt(rounds=10),
        ).decode('utf-8')

    @staticmethod
    def _check_password(password: str, hashed: str) -> bool:
        return bcrypt.checkpw(
            password.encode('utf-8'),
            hashed.encode('utf-8'),
        )

    @staticmethod
    def _token_response(user: dict) -> dict:
        user_id = str(user['_id'])
        token = create_access_token(identity=user_id)
        return {
            'token': token,
            'user': {
                'id': user_id,
                'name': user.get('name'),
                'email': user.get('email'),
            },
        }

    def signup(self, name: str, email: str, password: str) -> tuple[dict | None, str | None]:
        if self._users().find_one({'email': email.lower()}):
            return None, 'User already exists'

        doc = {
            'name': name.strip(),
            'email': email.lower().strip(),
            'password': self._hash_password(password),
            'addresses': [],
            'favorites': [],
            'createdAt': datetime.utcnow(),
        }
        result = self._users().insert_one(doc)
        doc['_id'] = result.inserted_id
        return self._token_response(doc), None

    def login(self, email: str, password: str) -> tuple[dict | None, str | None]:
        user = self._users().find_one({'email': email.lower().strip()})
        if not user or not self._check_password(password, user['password']):
            return None, 'Invalid credentials'
        return self._token_response(user), None

    def get_profile(self, user_id: str) -> tuple[dict | None, str | None]:
        try:
            oid = ObjectId(user_id)
        except Exception:
            return None, 'Invalid token'

        user = self._users().find_one({'_id': oid}, {'password': 0})
        if not user:
            return {'id': user_id}, None
        serialized = serialize_doc(user)
        return {'id': serialized.get('id', user_id), **serialized}, None

    def update_profile(self, user_id: str, data: dict) -> tuple[dict | None, str | None]:
        try:
            oid = ObjectId(user_id)
        except Exception:
            return None, 'Invalid user'

        allowed = {'name', 'phone', 'profilePicture'}
        updates = {k: v for k, v in data.items() if k in allowed and v is not None}
        if not updates:
            return None, 'No valid fields to update'

        self._users().update_one({'_id': oid}, {'$set': updates})
        user = self._users().find_one({'_id': oid}, {'password': 0})
        return serialize_doc(user), None

    def logout(self) -> dict:
        return {'success': True, 'message': 'Logged out successfully'}
