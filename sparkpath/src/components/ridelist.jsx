// src/components/ridelistst.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RideList = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/rides/history') // your Flask route
      .then(res => setRides(res.data.rides))
      .catch(err => console.error("Error fetching rides:", err));
  }, []);

  return (
    <div className="p-6 bg-[#111] min-h-screen text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Your Ride History</h1>

      {rides.length === 0 ? (
        <p>No rides yet.</p>
      ) : (
        rides.map((ride, idx) => (
          <div key={idx} className="mb-8 p-4 bg-[#1e1e1e] rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-yellow-300">
              {ride.user?.name || "Anonymous"}'s Ride
            </h2>
            <p>From: {ride.from?.join(', ')}</p>
            <p>To: {ride.to?.join(', ')}</p>
            <p>Ride Type: {ride.rideType}</p>
            <p>Carbon Saved: {ride.carbon_saved} kg</p>
            <p>Trees Saved: {ride.trees_saved}</p>
            <p>Distance: {ride.distance_km} km</p>
            <p>Duration: {ride.duration_min} min</p>

            {ride.from && ride.to && (
              <MapContainer
                center={ride.from}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: "250px", marginTop: "1rem", borderRadius: "8px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                <Polyline
                  positions={[ride.from, ride.to]}
                  color="lime"
                />
              </MapContainer>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RideList;
