import React from 'react';
import RideOptions from './ride-options';
import FindaRideStats from './find-ride-stats';
import MapComponent from './map-component';

function FoundRides() {
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
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default FoundRides; 