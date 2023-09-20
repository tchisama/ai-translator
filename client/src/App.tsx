import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import markerIcon from './assets/marker.png';
import userMarkerIcon from './assets/userMarker.png';
import axios from "axios"

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 0,
  lng: 0
};

const maxBounds = {
  north: 85, // Maximum allowed latitude (Y)
  south: -85, // Minimum allowed latitude (Y)
  east: 180, // Maximum allowed longitude (X)
  west: -180 // Minimum allowed longitude (X)
};

const customMapStyle = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ color: '#EC4754' }] // Set the color to white
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke', // Target borders
    stylers: [{ color: '#FF959D' }] // Set the border color to white
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#282A3C' }] // Set the color to blue
  },
  {
    featureType: 'label',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#000000' }] // Set the label text color to black
  }
];

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD5BVORixh1-sFZ6oZkX-xh9mIu6egZy_0' // Replace with your API key
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPositions, setMarkerPositions] = useState([
    { lat: 0, lng: 0 }, // Initial position for marker 1
    { lat: 10, lng: 10 } // Initial position for marker 2
  ]);

  // Define state for marker countries
  const [markerCountries, setMarkerCountries] = useState([
    'Country 1',
    'Country 2'
  ]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleMarkerDrag = async (
    index: number,
    position: google.maps.LatLngLiteral
  ) => {
    const updatedPositions = [...markerPositions];
    updatedPositions[index] = position;
    setMarkerPositions(updatedPositions);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=AIzaSyD5BVORixh1-sFZ6oZkX-xh9mIu6egZy_0`
      );
      console.log(markerCountries)
      console.log(position)

      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
        const countryComponent = addressComponents.find((component) =>
          component.types.includes('country')
        );

        if (countryComponent) {
          const countryName = countryComponent.long_name;
          const updatedCountries = [...markerCountries];
          updatedCountries[index] = countryName;
          setMarkerCountries(updatedCountries);
        }
      }
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  };


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        minZoom: 3,
        maxZoom: 4,
        styles: customMapStyle,
        restriction: {
          latLngBounds: maxBounds,
          strictBounds: false
        }
      }}
    >
      {markerPositions.map((position, index) => (
        <Marker
          key={index}
          position={position}
          draggable={true}
          onDragEnd={(e) => handleMarkerDrag(index, (e.latLng as any).toJSON())}
          icon={{
            url: index === 0 ? markerIcon : userMarkerIcon,
            scaledSize: new window.google.maps.Size(40, 40)
          }}
          // Display marker country information
          title={`Country: ${markerCountries[index]}`}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
