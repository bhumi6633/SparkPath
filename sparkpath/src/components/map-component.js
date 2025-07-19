import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '500px', // Large map
};

const center = {
  lat: 43.6532,  // Example: Toronto
  lng: -79.3832,
};

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  const location = useLocation();

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          key={location.pathname} // Force remount on route change
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {/* Add markers or other components here */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;