import pytest
from angoranet import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_put_requires_json(client):
    res = client.put('/messages', data='notjson', headers={'Content-Type': 'text/plain'})
    assert res.status_code == 400
    assert b'JSON' in res.data

def test_put_requires_content_field(client):
    res = client.put('/messages', json={'foo': 'bar'})
    assert res.status_code == 400
    assert b'content' in res.data

def test_put_success(client):
    res = client.put('/messages', json={'content': 'hello'})
    assert res.status_code == 200
    assert res.get_json()['content'] == 'hello'
