import React, { useContext, useState } from 'react';
import MapComponent from './map-component';
import Chatbot from './chatbot';
import { AuthContext } from '../App';

function PostRide() {
  const { isSignedIn } = useContext(AuthContext);
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const geocode = async (place, setter) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setter([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert(`Could not find location: ${place}`);
      }
    } catch (err) {
      alert("Error fetching coordinates");
    }
  };

  const handleBlur = (e, type) => {
    if (type === 'from') geocode(fromText, setFromCoords);
    else geocode(toText, setToCoords);
  };

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
                value={fromText}
                onChange={(e) => setFromText(e.target.value)}
                onBlur={(e) => handleBlur(e, 'from')}
              />
            </div>
            <div className='par-formgroup'>
              <label htmlFor='End' className="end-label">End:</label>
              <input 
                type='text' 
                placeholder='Ending Location' 
                className="end-input"
                value={toText}
                onChange={(e) => setToText(e.target.value)}
                onBlur={(e) => handleBlur(e, 'to')}
              />
            </div>
            <div className='par-formgroup'>
              <label htmlFor='Benefits' className="end-label">Benefits:</label>
              <input 
                type='text' 
                placeholder='Benefits' 
                className="end-input"
                disabled
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
            {fromCoords && toCoords ? (
              <MapComponent from={fromCoords} to={toCoords} onRouteInfo={({ distance, duration }) => { setDistance(distance); setDuration(duration); }} />
            ) : (
              <p style={{ textAlign: 'center', marginTop: '50%', color: '#999' }}>
                Enter locations to preview route
              </p>
            )}
          </div>
        </div>
      </form>
      <div className='par-trip-card'>
        <label htmlFor='Trip' className="end-label">Trip Description:</label>
        <input 
          type='text' 
          placeholder='Enter Trip Description' 
          className="end-input"
        />
      </div>
      <div className='par-trip-card'>
        <button className="search-rides" style={{ width: '100%' }} disabled={!isSignedIn} title={!isSignedIn ? 'Please sign in to confirm' : ''}>Confirm</button>
        {!isSignedIn && <div style={{color: 'red', marginTop: 8}}>You must be signed in to confirm a ride.</div>}
      </div>
      <Chatbot 
        from={fromText} 
        to={toText} 
        distance={distance} 
        duration={duration} 
      />
    </div>
  );
}

export default PostRide;
