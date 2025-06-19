from flask import Flask, request, jsonify, abort

app = Flask(__name__)

@app.route('/messages', methods=['POST', 'PUT'])
def handle_post():
    """Handle POST and PUT requests for message resources."""
    # Validate JSON input
    if not request.is_json:
        return (
            jsonify(error='Request body must be JSON and use Content-Type: application/json'),
            400,
        )

    data = request.get_json()
    if 'content' not in data:
        abort(400, description='"content" field is required')

    if request.method == 'POST':
        return jsonify(status='created', content=data['content']), 201

    # PUT branch
    return jsonify(status='updated', content=data['content']), 200
