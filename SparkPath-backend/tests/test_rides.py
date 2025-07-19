import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.testing = True
    return app.test_client()

def test_get_available_rides(client):
    res = client.get("/rides/")
    assert res.status_code == 200

    data = res.get_json()
    assert isinstance(data, list)
    assert "model" in data[0]

def test_time_saved_route(client, monkeypatch):
    # Mock Google Maps API call
    class MockDirections:
        def __getitem__(self, index):
            return {
                'legs': [{
                    'distance': {'value': 20000}  # 20 km
                }]
            }

    monkeypatch.setattr("routes.rides.gmaps.directions", lambda a, b, mode: [MockDirections()])

    payload = {
        "start_point": "Toronto",
        "end_point": "Mississauga",
        "avg_speed_hov": 90,
        "avg_speed_regular": 60
    }
    res = client.post("/rides/time/saved", json=payload)
    assert res.status_code == 200

    data = res.get_json()
    assert "time_saved_minutes" in data
    assert data["time_saved_minutes"] > 0

