import React, { useContext } from 'react';
import MapComponent from './map-component';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';

function PostRide() {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <div className='par-postride-page'>
      <form className='par-form'>
        <div className='par-flex-row'>
          <div className='par-form-fields'>
            <h1>Post a Ride</h1>
            <div className='par-formgroup'>
              <label htmlFor='Start' className="start-label">Start:</label>
              <input 
                type='text' 
                placeholder='Starting Location' 
                className="start-input"
              />
            </div>
            <div className='par-formgroup'>
              <label htmlFor='End' className="end-label">End:</label>
              <input 
                type='text' 
                placeholder='Ending Location' 
                className="end-input"
              />
            </div>
            <div className='par-formgroup'>
              <label htmlFor='Benefits' className="end-label">Benefits:</label>
              <input 
                type='text' 
                placeholder='Benefits' 
                className="end-input"
                disabled="disabled"
              />
            </div>
            <div className='par-formgroup'>
              <label htmlFor='Seats' className="end-label">Seats:</label>
              <input 
                type='number' 
                placeholder='0' 
                className="end-input"
              />
            </div>
          </div>
          <div className='par-map-container'>
            <MapComponent />
          </div>
        </div>
      </form>
      <div className='par-trip-card'>
        <label htmlFor='Trip' className="end-label">Trip Description:</label>
        <input 
          type='Text' 
          placeholder='Enter Trip Description' 
          className="end-input"
        />
      </div>
      <div className='par-trip-card'>
        <Link to="/confirm" className="search-rides" style={{ width: '100%' }} disabled={!isSignedIn} title={!isSignedIn ? 'Please sign in to confirm' : ''}>Confirm</Link>
        {!isSignedIn && <div style={{color: 'red', marginTop: 8}}>You must be signed in to confirm a ride.</div>}
      </div> 
    </div>
  );
}

export default PostRide; 