import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './find-a-ride.css';

function FindaRideInfo() {
  const { isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (isSignedIn) {
      navigate('/found-rides');
    }
  };

  return (
    <div className="fri-wrapper">
      <h1 className="fri-heading">Find a Ride</h1>
      <p className="fri-subheading">Find a ride to your destination</p>

      <div className="fri-card">
        <form className="fri-form" onSubmit={handleSearch}>
          <div className="fri-form-group">
            <label htmlFor="from">From:</label>
            <input type="text" placeholder="From" />
          </div>

          <div className="fri-form-group">
            <label htmlFor="to">To:</label>
            <input type="text" placeholder="To" />
          </div>

          <div className="fri-form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" />
          </div>

          <div className="fri-form-group">
            <label htmlFor="seats">Seats Needed:</label>
            <input type="number" placeholder="Seats Needed" />
          </div>

          <button
            type="submit"
            className="search-rides"
            disabled={!isSignedIn}
            title={!isSignedIn ? 'Please sign in to search' : ''}
          >
            Search
          </button>

          {!isSignedIn && (
            <div className="fri-warning">
              You must be signed in to search for rides.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FindaRideInfo;
