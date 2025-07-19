import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const start = [43.6532, -79.3832]; // Toronto
const end = [43.6426, -79.3871];   // CN Tower

const MapORS = () => {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch('http://localhost:5000/ors/route', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ start: [start[1], start[0]], end: [end[1], end[0]] }) // lng, lat
        });
        const data = await res.json();
        const coords = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRouteCoords(coords);
      } catch (err) {
        console.error('Failed to load route:', err);
      }
    };

    fetchRoute();
  }, []);

  return (
    <MapContainer center={start} zoom={14} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://openrouteservice.org/">ORS</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={start} />
      <Marker position={end} />
      <Polyline positions={routeCoords} color="blue" />
    </MapContainer>
  );
};

export default MapORS;
