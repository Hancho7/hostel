import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const apiKey = import.meta.env.VITE_API_KEY;

const HostelExactLocation = ({ latitude, longitude }) => {
  const [directions, setDirections] = useState(null);

  const loadScript = async () => {
    const googleMaps = await window.google;
    return new googleMaps.maps.DirectionsService();
  };

  useEffect(() => {
    if (latitude && longitude) {
      const directionsService = loadScript();

      const origin = { lat: latitude, lng: longitude };
      const destination = { lat: 5.766230956101201, lng: 0.05077037941015217 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", result);
          }
        }
      );
    }
  }, [latitude, longitude]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          latitude && longitude ? { lat: latitude, lng: longitude } : null
        }
        zoom={15}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default HostelExactLocation;
