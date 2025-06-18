from flask import Flask, request, jsonify, abort

app = Flask(__name__)

users = {}
posts = []
proposals = []

@app.route('/')
def index():
    return jsonify({"message": "AgoraNet prototype"})

# User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        abort(400, 'username and password required')
    if username in users:
        abort(400, 'username already exists')
    users[username] = {'password': password}
    return jsonify({"status": "registered"})

# Simple login (returns success if username/password match)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    user = users.get(username)
    if not user or user['password'] != password:
        abort(401, 'invalid credentials')
    return jsonify({"status": "logged_in"})

# Posts API
@app.route('/posts', methods=['GET', 'POST'])
def handle_posts():
    if request.method == 'POST':
        data = request.get_json() or {}
        post = {
            'id': len(posts) + 1,
            'author': data.get('author'),
            'content': data.get('content')
        }
        if not post['author'] or not post['content']:
            abort(400, 'author and content required')
        posts.append(post)
        return jsonify(post), 201
    return jsonify(posts)

@app.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(post_id):
    post = next((p for p in posts if p['id'] == post_id), None)
    if not post:
        abort(404)
    if request.method == 'GET':
        return jsonify(post)
    elif request.method == 'PUT':
        data = request.get_json() or {}
        post['content'] = data.get('content', post['content'])
        return jsonify(post)
    elif request.method == 'DELETE':
        posts.remove(post)
        return '', 204

# Governance proposals
@app.route('/proposals', methods=['GET', 'POST'])
def handle_proposals():
    if request.method == 'POST':
        data = request.get_json() or {}
        proposal = {
            'id': len(proposals) + 1,
            'title': data.get('title'),
            'description': data.get('description')
        }
        if not proposal['title']:
            abort(400, 'title required')
        proposals.append(proposal)
        return jsonify(proposal), 201
    return jsonify(proposals)

if __name__ == '__main__':
    app.run(debug=True)
