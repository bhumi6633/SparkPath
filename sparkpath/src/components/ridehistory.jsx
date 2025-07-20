import React, { useEffect, useState } from 'react';

function RideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/rides/history')
      .then(res => res.json())
      .then(data => setRides(data.rides))
      .catch(err => console.error('Failed to fetch rides:', err));
  }, []);

  return (
    <div className="ride-history">
      <h2 className="text-xl font-bold mb-4">Ride History</h2>
      <ul>
        {rides.map((ride, index) => (
          <li key={index} className="mb-2 p-4 rounded bg-gray-800 text-white shadow">
            <p><strong>Passenger:</strong> {ride.user?.name}</p>
            <p><strong>From:</strong> {ride.from?.join(', ')}</p>
            <p><strong>To:</strong> {ride.to?.join(', ')}</p>
            <p><strong>Type:</strong> {ride.rideType}</p>
            <p><strong>Distance:</strong> {ride.distance_km} km</p>
            <p><strong>CO₂ Saved:</strong> {ride.carbon_saved} kg</p>
            <p><strong>Trees Saved:</strong> {ride.trees_saved}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RideHistory;
