import React from 'react';
import RideOptions from './ride-options';
import FindaRideStats from './find-ride-stats';
import MapComponent from './map-component';

function FoundRides() {
  // Toronto and Waterloo coordinates
  const from = [43.65107, -79.347015]; // Toronto
  const to = [43.4643, -80.5204]; // Waterloo
  return (
    <div className="found-rides-page">
      <h1>Found Rides</h1>
      <div className="found-rides-flex-row">
        <div className="found-rides-left-col">
          <div className="found-rides-card">
            <RideOptions />
          </div>
          <div className="found-rides-card" style={{ marginTop: '28px' }}>
            <FindaRideStats />
          </div>
        </div>
        <div className="found-rides-card found-rides-map">
          <MapComponent from={from} to={to} />
        </div>
      </div>
    </div>
  );
}

export default FoundRides;