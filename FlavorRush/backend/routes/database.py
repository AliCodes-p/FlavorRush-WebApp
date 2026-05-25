from datetime import datetime

from flask import Blueprint, jsonify

from database.connection import get_db


db_bp = Blueprint('database', __name__)
TEST_COLLECTION = 'sample_data'


def _serialize_document(document):
    if document is None:
        return None

    serialized = dict(document)
    serialized['_id'] = str(serialized.get('_id'))

    created_at = serialized.get('createdAt')
    if isinstance(created_at, datetime):
        serialized['createdAt'] = created_at.isoformat()

    return serialized


@db_bp.post('/test')
def insert_and_fetch_sample_data():
    try:
        db = get_db()
    except RuntimeError as exc:
        return jsonify({
            'status': 'error',
            'message': 'Database is not ready',
            'details': str(exc),
        }), 503

    sample_document = {
        'message': 'MongoDB Atlas test insert',
        'source': 'FlavorRush Flask backend',
        'status': 'connected',
        'createdAt': datetime.utcnow(),
    }

    insert_result = db[TEST_COLLECTION].insert_one(sample_document)
    stored_document = db[TEST_COLLECTION].find_one({'_id': insert_result.inserted_id})

    return jsonify({
        'status': 'success',
        'message': 'Sample data inserted and fetched successfully',
        'inserted_id': str(insert_result.inserted_id),
        'data': _serialize_document(stored_document),
    }), 201


@db_bp.get('/test')
def fetch_sample_data():
    try:
        db = get_db()
    except RuntimeError as exc:
        return jsonify({
            'status': 'error',
            'message': 'Database is not ready',
            'details': str(exc),
        }), 503

    documents = list(
        db[TEST_COLLECTION]
        .find({}, {'_id': 1, 'message': 1, 'status': 1, 'createdAt': 1})
        .sort('createdAt', -1)
        .limit(5)
    )

    return jsonify({
        'status': 'success',
        'message': 'Latest MongoDB sample data fetched successfully',
        'count': len(documents),
        'data': [_serialize_document(document) for document in documents],
    })
