import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px', // Large map
  border: '1px solid #FFD700',
  borderRadius: '8px',
};

const center = {
  lat: 43.6532,  // Example: Toronto
  lng: -79.3832,
};

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div style={{ 
        width: '100%', 
        height: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #FFD700'
      }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>Error loading map</p>
          <p style={{ fontSize: '14px' }}>Please check your internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{ 
        width: '100%', 
        height: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #FFD700'
      }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Add markers or other components here */}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;