import sys, pathlib; sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))
from fastapi.testclient import TestClient
from src.green_ai.service import app
from unittest.mock import AsyncMock, patch

@patch('src.green_ai.service.telemetry.poll', new=AsyncMock(return_value={'power':100}))
@patch('src.green_ai.service.actions.apply')
def test_step_endpoint(mock_apply):
    client = TestClient(app)
    resp = client.post('/step')
    assert resp.status_code == 200
    data = resp.json()
    assert 'action' in data


def test_metrics_endpoint():
    client = TestClient(app)
    resp = client.get('/metrics')
    assert resp.status_code == 200
