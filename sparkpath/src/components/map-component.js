import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const [startQuery, setStartQuery] = useState('');
  const [endQuery, setEndQuery] = useState('');
  const [startResults, setStartResults] = useState([]);
  const [endResults, setEndResults] = useState([]);

  const searchLocation = async (query, setResults) => {
    if (!query) return;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  const handleSelectLocation = (place, type) => {
    const coords = [parseFloat(place.lat), parseFloat(place.lon)];
    if (type === 'start') {
      setStart(coords);
      setStartQuery(place.display_name);
      setStartResults([]);
    } else {
      setEnd(coords);
      setEndQuery(place.display_name);
      setEndResults([]);
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (!start || !end) return;
      try {
        const res = await fetch('http://localhost:5000/ors/route', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ start: [start[1], start[0]], end: [end[1], end[0]] })
        });
        const data = await res.json();
        const coords = data.geojson.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRouteCoords(coords);
        setDistance(data.distance);
        setDuration(data.duration);
      } catch (err) {
        console.error('Failed to load route:', err);
      }
    };

    fetchRoute();
  }, [start, end]);

  const reset = () => {
    setStart(null);
    setEnd(null);
    setRouteCoords([]);
    setDistance(null);
    setDuration(null);
    setStartQuery('');
    setEndQuery('');
    setStartResults([]);
    setEndResults([]);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
          <input
            value={startQuery}
            onChange={(e) => {
              setStartQuery(e.target.value);
              searchLocation(e.target.value, setStartResults);
            }}
            placeholder="Start location..."
            style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
          />
          {startResults.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '100px', overflowY: 'auto', background: '#fff', border: '1px solid #ddd' }}>
              {startResults.map((place, index) => (
                <li key={index} style={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleSelectLocation(place, 'start')}>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <input
            value={endQuery}
            onChange={(e) => {
              setEndQuery(e.target.value);
              searchLocation(e.target.value, setEndResults);
            }}
            placeholder="End location..."
            style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
          />
          {endResults.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '100px', overflowY: 'auto', background: '#fff', border: '1px solid #ddd' }}>
              {endResults.map((place, index) => (
                <li key={index} style={{ padding: '5px', cursor: 'pointer' }} onClick={() => handleSelectLocation(place, 'end')}>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <MapContainer center={[43.65, -79.38]} zoom={13} style={{ height: '500px', width: '100%', borderRadius: '10px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {start && <Marker position={start} />}
        {end && <Marker position={end} />}
        {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
      </MapContainer>

      {distance && duration && (
        <div style={{ marginTop: '10px', fontSize: '16px' }}>
          <p><strong>Distance:</strong> {distance} km</p>
          <p><strong>Duration:</strong> {duration} minutes</p>
        </div>
      )}

      <button onClick={reset} style={{ marginTop: '10px' }}>Reset</button>
    </>
  );
};

export default MapComponent;
