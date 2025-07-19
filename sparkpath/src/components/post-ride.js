import React, { useContext } from 'react';
import MapComponent from './map-component';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';

function PostRide() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <div className="pr-container">
      <div className="pr-card">
        <h1 className="pr-heading">Post a Ride</h1>
        <form className="pr-form">
          <div className="pr-form-fields">
            <div className="pr-form-group">
              <label htmlFor="start">Start:</label>
              <input type="text" placeholder="Starting Location" />
            </div>
            <div className="pr-form-group">
              <label htmlFor="end">End:</label>
              <input type="text" placeholder="Ending Location" />
            </div>
            <div className="pr-form-group">
              <label htmlFor="benefits">Benefits:</label>
              <input type="text" placeholder="Benefits" disabled />
            </div>
            <div className="pr-form-group">
              <label htmlFor="seats">Seats:</label>
              <input type="number" placeholder="0" />
            </div>
            <div className="pr-form-group">
              <label htmlFor="description">Trip Description:</label>
              <textarea placeholder="Enter Trip Description" rows="3" />
            </div>
          </div>

          <div className="pr-map">
            <MapComponent />
          </div>
        </form>

        <div className="pr-confirm-wrapper">
          <Link
            to="/confirm"
            className={`pr-confirm-button ${!isSignedIn ? 'pr-disabled' : ''}`}
            disabled={!isSignedIn}
            title={!isSignedIn ? 'Please sign in to confirm' : ''}
          >
            Confirm Ride
          </Link>
          {!isSignedIn && (
            <p className="pr-warning-text">⚠️ Please sign in to confirm a ride.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostRide;
