// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const apiKey = process.env.REACT_APP_ORS_API_KEY;

// const MapComponent = ({ from, to }) => {
//   const [routeInfo, setRouteInfo] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!apiKey) {
//       setError('OpenRouteService API key is missing. Check your .env file and restart the dev server.');
//       return;
//     }
//     if (!from || !to) return;

//     const fetchRoute = async () => {
//       try {
//         const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
//         const response = await fetch(url, {
//           method: 'POST',
//           headers: {
//             'Authorization': apiKey,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             coordinates: [[from[1], from[0]], [to[1], to[0]]],
//           }),
//         });
//         if (!response.ok) throw new Error('Failed to fetch route');
//         const data = await response.json();

//         const feature = data.features[0];
//         const distance = (feature.properties.summary.distance / 1000).toFixed(1);
//         const duration = Math.round(feature.properties.summary.duration / 60);

//         setRouteInfo({
//           distance: `${distance} km`,
//           duration: `${duration} minutes`,
//           coordinates: feature.geometry.coordinates || [],
//         });
//       } catch (err) {
//         setError('Error loading route from ORS: ' + err.message);
//       }
//     };
//     fetchRoute();
//   }, [apiKey, from, to]);

//   if (error) {
//     return (
//       <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #FFD700' }}>
//         <div style={{ textAlign: 'center', color: '#c00' }}>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ width: '100%', height: 'auto', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '1px solid #FFD700', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
//       <h3 style={{ color: '#333', marginBottom: '20px' }}>Route Information</h3>

//       <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
//         <h4 style={{ color: '#2c5aa0', marginBottom: '15px' }}>From → To</h4>

//         {routeInfo ? (
//           <div>
//             <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Distance:</strong> {routeInfo.distance}</p>
//             <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Duration:</strong> {routeInfo.duration}</p>
//             <p style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
//               Route coordinates: {Array.isArray(routeInfo.coordinates) ? routeInfo.coordinates.length : 0} points
//             </p>
//           </div>
//         ) : (
//           <p style={{ color: '#666' }}>Loading route information...</p>
//         )}
//       </div>

//       {routeInfo && Array.isArray(routeInfo.coordinates) && routeInfo.coordinates.length > 0 && (
//         <MapContainer
//           center={from}
//           zoom={6}
//           scrollWheelZoom={false}
//           style={{ height: "300px", width: "100%", marginTop: "20px", borderRadius: "8px" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="© OpenStreetMap contributors"
//           />
//           <Polyline
//             positions={routeInfo.coordinates.map(([lng, lat]) => [lat, lng])}
//             color="blue"
//           />
//         </MapContainer>
//       )}

//       <p style={{ fontSize: '12px', color: '#999', marginTop: '20px', textAlign: 'center' }}>
//         Powered by OpenRouteService API
//       </p>
//     </div>
//   );
// };

// export default MapComponent;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const apiKey = process.env.REACT_APP_ORS_API_KEY;

const MapComponent = ({ from, to, onRouteInfo }) => {
  const [routeInfo, setRouteInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      setError('OpenRouteService API key is missing. Check your .env file and restart the dev server.');
      return;
    }
    if (!from || !to) return;

    const fetchRoute = async () => {
      try {
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [[from[1], from[0]], [to[1], to[0]]],
          }),
        });
        if (!response.ok) throw new Error('Failed to fetch route');
        const data = await response.json();

        const feature = data.features[0];
        const distance = (feature.properties.summary.distance / 1000).toFixed(1);
        const duration = Math.round(feature.properties.summary.duration / 60);

        const newRouteInfo = {
          distance: `${distance} km`,
          duration: `${duration} minutes`,
          coordinates: feature.geometry.coordinates || [],
        };

        setRouteInfo(newRouteInfo);
        if (onRouteInfo) onRouteInfo(newRouteInfo);
      } catch (err) {
        setError('Error loading route from ORS: ' + err.message);
      }
    };
    fetchRoute();
  }, [apiKey, from, to, onRouteInfo]);

  if (error) {
    return (
      <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #FFD700' }}>
        <div style={{ textAlign: 'center', color: '#c00' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 'auto', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '1px solid #FFD700', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>Route Information</h3>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h4 style={{ color: '#2c5aa0', marginBottom: '15px' }}>From → To</h4>

        {routeInfo ? (
          <div>
            <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Distance:</strong> {routeInfo.distance}</p>
            <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Duration:</strong> {routeInfo.duration}</p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
              Route coordinates: {Array.isArray(routeInfo.coordinates) ? routeInfo.coordinates.length : 0} points
            </p>
          </div>
        ) : (
          <p style={{ color: '#666' }}>Loading route information...</p>
        )}
      </div>

      {routeInfo && Array.isArray(routeInfo.coordinates) && routeInfo.coordinates.length > 0 && (
        <MapContainer
          center={from}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%", marginTop: "20px", borderRadius: "8px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Polyline
            positions={routeInfo.coordinates.map(([lng, lat]) => [lat, lng])}
            color="blue"
          />
        </MapContainer>
      )}

      <p style={{ fontSize: '12px', color: '#999', marginTop: '20px', textAlign: 'center' }}>
        Powered by OpenRouteService API
      </p>
    </div>
  );
};

export default MapComponent;

