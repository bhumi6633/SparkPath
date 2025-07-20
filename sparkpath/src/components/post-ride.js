import React, { useContext, useState } from 'react';
import MapComponent from './map-component';
import { AuthContext } from '../App';

function PostRide() {
  const { isSignedIn } = useContext(AuthContext);
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [benefits, setBenefits] = useState('');

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

  // Generate random benefits when Enter is pressed
  const generateBenefits = () => {
    if (fromText.trim() && toText.trim()) {
      // CO2 saved: random between 5-25 kg (realistic for carpooling)
      const randomCo2 = Math.floor(Math.random() * 21) + 5;
      const benefitsText = `CO2 Saved: ${randomCo2}kg`;
      setBenefits(benefitsText);
    } else {
      alert('Please enter both start and end locations');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generateBenefits();
    }
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className='par-formgroup'>
              <label htmlFor='Benefits' className="end-label">Benefits:</label>
              <input 
                type='text' 
                value={benefits}
                placeholder='Benefits'
                className="end-input"
                readOnly
                style={{ 
                  backgroundColor: benefits ? '#f0f9ff' : '#f9fafb', 
                  color: benefits ? '#065f46' : '#6b7280', 
                  fontWeight: benefits ? '500' : '400',
                  fontStyle: benefits ? 'normal' : 'italic'
                }}
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
              <MapComponent from={fromCoords} to={toCoords} />
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
    </div>
  );
}

export default PostRide;
