from flask import jsonify


def success_response(data=None, message=None, status=200):
    payload = {}
    if message:
        payload['message'] = message
    if data is not None:
        if isinstance(data, dict):
            payload.update(data)
        else:
            payload['data'] = data
    return jsonify(payload), status


def error_response(message: str, status: int = 400):
    return jsonify({'error': message}), status
