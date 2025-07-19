import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.testing = True
    return app.test_client()

def test_carbon_basic(client):
    payload = {
        "distance_km": 50,
        "passengers": 2
    }
    res = client.post("/carbon", json=payload)
    assert res.status_code == 200

    data = res.get_json()
    assert "co2_saved_kg" in data
    assert "trees_saved" in data
    assert data["co2_saved_kg"] > 0
    assert data["trees_saved"] > 0
