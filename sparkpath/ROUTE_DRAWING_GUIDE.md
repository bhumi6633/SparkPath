# Route Drawing Guide for SparkPath

This guide explains how to use the enhanced `MapComponent` to draw routes between start and finish locations that users choose.

## Overview

The `MapComponent` has been enhanced with the following features:
- **Route Drawing**: Display driving routes between two locations
- **Location Markers**: Show start (green) and end (red) markers
- **Geocoding**: Convert address strings to coordinates automatically
- **Interactive Controls**: Show/hide routes and markers

## How to Use

### Basic Usage

```jsx
import MapComponent from './components/map-component';

function MyComponent() {
  return (
    <MapComponent 
      startLocation="Toronto, ON"
      endLocation="Mississauga, ON"
      showRoute={true}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `startLocation` | string | `''` | The starting address/location |
| `endLocation` | string | `''` | The ending address/location |
| `showRoute` | boolean | `false` | Whether to display the route line |

### Features

#### 1. Route Drawing
- When `showRoute={true}`, the component will:
  - Geocode both addresses to get coordinates
  - Use Google Maps Directions Service to calculate the optimal driving route
  - Display the route as a green line on the map
  - Automatically fit the map to show the entire route

#### 2. Location Markers
- **Start Marker**: Green marker with label "A"
- **End Marker**: Red marker with label "B"
- Markers are always shown when locations are provided
- Hover over markers to see the location name

#### 3. Geocoding
- Automatically converts address strings to coordinates
- Supports various address formats:
  - "Toronto, ON"
  - "123 Main Street, Toronto"
  - "CN Tower, Toronto"
  - "University of Toronto"

## Implementation Examples

### 1. Post Ride Page
The `PostRide` component demonstrates how to connect form inputs to the map:

```jsx
function PostRide() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [showRoute, setShowRoute] = useState(false);

  return (
    <div>
      <input 
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
        placeholder="Starting Location"
      />
      <input 
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
        placeholder="Ending Location"
      />
      <button onClick={() => setShowRoute(true)}>Show Route</button>
      
      <MapComponent 
        startLocation={startLocation}
        endLocation={endLocation}
        showRoute={showRoute}
      />
    </div>
  );
}
```

### 2. Find a Ride Flow
The `FindaRideInfo` and `FoundRides` components show how to pass location data between pages:

```jsx
// In FindaRideInfo component
const handleSearch = (e) => {
  e.preventDefault();
  navigate('/found-rides', {
    state: {
      fromLocation,
      toLocation,
      date,
      seats
    }
  });
};

// In FoundRides component
const location = useLocation();
const fromLocation = location.state?.fromLocation || '';
const toLocation = location.state?.toLocation || '';

<MapComponent 
  startLocation={fromLocation}
  endLocation={toLocation}
  showRoute={showRoute}
/>
```

## API Requirements

### Google Maps API Key
Make sure you have a valid Google Maps API key with the following services enabled:
- Maps JavaScript API
- Directions API
- Geocoding API
- Places API

Set the API key in your environment variables:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Required Libraries
The component uses these Google Maps libraries:
- `places` - For geocoding functionality
- `geometry` - For coordinate calculations

## Error Handling

The component includes error handling for:
- **Missing API Key**: Shows error message if API key is not provided
- **Geocoding Failures**: Logs errors when addresses cannot be converted to coordinates
- **Directions Failures**: Logs errors when route calculation fails
- **Network Issues**: Shows loading and error states

## Styling

The route line uses these default styles:
- **Color**: `#065f46` (green)
- **Weight**: 4px
- **Opacity**: 0.8

You can customize these in the `MapComponent` by modifying the `polylineOptions`:

```jsx
<DirectionsRenderer
  directions={directions}
  options={{
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#your-color',
      strokeWeight: 6,
      strokeOpacity: 0.9
    }
  }}
/>
```

## Demo Component

A demo component (`MapDemo`) is included to showcase the functionality:
- Interactive input fields for start and end locations
- Example routes for quick testing
- Show/hide route controls
- Instructions and usage tips

## Troubleshooting

### Common Issues

1. **Route not showing**: 
   - Check that both `startLocation` and `endLocation` are provided
   - Ensure `showRoute` is set to `true`
   - Verify your Google Maps API key is valid

2. **Markers not appearing**:
   - Check that addresses can be geocoded
   - Look for geocoding errors in the browser console

3. **API errors**:
   - Verify all required Google Maps services are enabled
   - Check your API key permissions and quotas

### Debug Mode
Enable console logging to debug issues:
```jsx
// Add this to see detailed logs
console.log('Start Location:', startLocation);
console.log('End Location:', endLocation);
console.log('Show Route:', showRoute);
```

## Performance Considerations

- Geocoding and route calculation are asynchronous operations
- Results are cached to avoid repeated API calls for the same locations
- The map automatically fits to show the entire route
- Consider implementing debouncing for real-time input updates

## Future Enhancements

Potential improvements to consider:
- Multiple route options (fastest, shortest, eco-friendly)
- Alternative transportation modes (walking, cycling, transit)
- Route optimization for multiple stops
- Real-time traffic integration
- Custom marker icons and info windows 