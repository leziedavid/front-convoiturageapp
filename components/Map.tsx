'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapProps {
  coordinates: Coordinate[];
  title: string;
}

const Map: React.FC<MapProps> = ({ coordinates, title }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState<Coordinate>({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const mapContainerStyle = { width: '100%', height: '600px' };

  const vehicleIcon = {
    url: 'https://i.ibb.co/cyvcpfF/uberx.png',
    scaledSize: { width: 32, height: 32 },
    anchor: { x: 16, y: 16 },
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!googleMapsApiKey) {
    console.error('Google Maps API Key is missing');
    return <div>Error: Google Maps API Key is missing!</div>;
  }

  const calculateZoomAndCenter = (coordinates: Coordinate[]) => {
    if (coordinates.length === 0) return;

    const lats = coordinates.map(coord => coord.lat);
    const lngs = coordinates.map(coord => coord.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    setCenter({ lat: centerLat, lng: centerLng });

    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    const calculatedZoom = maxDiff > 10 ? 6 : maxDiff > 5 ? 8 : 10;
    setZoom(calculatedZoom);
  };

  const calculateRoute = useCallback(() => {
    const directionsService = new google.maps.DirectionsService();
    const waypoints = coordinates.slice(1, coordinates.length - 1).map(coord => ({
      location: new google.maps.LatLng(coord.lat, coord.lng),
      stopover: true,
    }));

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng),
      destination: new google.maps.LatLng(coordinates[coordinates.length - 1].lat, coordinates[coordinates.length - 1].lng),
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }, [coordinates]);

  useEffect(() => {
    if (coordinates.length > 0) {
      calculateZoomAndCenter(coordinates);
    }
    if (coordinates.length >= 2) {
      calculateRoute();
    }
  }, [coordinates, calculateRoute]);

  return (
    <div className="">
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={['places']}
        onLoad={() => setGoogleMapsLoaded(true)}
      >
        {googleMapsLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{ suppressMarkers: true }}
              />
            )}

            {coordinates.map((coord, index) => (
              <Marker
                key={index}
                position={{ lat: coord.lat, lng: coord.lng }}
                icon={index === 0 ? vehicleIcon : undefined}
                title={`Point ${index + 1}`}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Chargement de la carte...</div>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
