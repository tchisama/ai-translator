import React,{useState} from 'react';
import { GoogleMap, useJsApiLoader , Marker } from '@react-google-maps/api';
import markerIcon from "./assets/marker.png"
import userMarkerIcon from "./assets/userMarker.png"

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 0,
  lng: 0
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
  },
];








function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAveqpCFkz-lZ3LLiYwzzMgQJLJll-AghQ"
  });

  const [map, setMap] = useState<google.maps.Map | null>(null); // Provide the appropriate type
  const [markerPositions, setMarkerPositions] = useState([
    { lat: 0, lng: 0 }, // Initial position for marker 1
    { lat: 10, lng: 10 } // Initial position for marker 2
  ]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, [])

  const onUnmount = React.useCallback(function callback(map:google.maps.Map) {
    setMap(null)
  }, [])


  const handleMarkerDrag = (index: number, position: google.maps.LatLngLiteral) => {
    const updatedPositions = [...markerPositions];
    updatedPositions[index] = position;
    setMarkerPositions(updatedPositions);
  };


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true, // Remove default UI elements (zoom and fullscreen buttons)
          minZoom: 3, // Set the minimum allowed zoom level
          maxZoom: 4, // Set the maximum allowed zoom level
          styles: customMapStyle // Apply the custom map style
        }}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {markerPositions.map((position, index) => (
        <Marker
          key={index}
          position={position}
          draggable={true}
          onDragEnd={(e) => handleMarkerDrag(index, (e.latLng as any).toJSON())}
          icon={{
            url:index==0?markerIcon:userMarkerIcon,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)