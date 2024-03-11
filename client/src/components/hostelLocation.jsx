import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Polyline,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const apiKey = import.meta.env.VITE_API_KEY;

const HostelExactLocation = ({ address }) => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [destination, setDestination] = useState(null);

  const loadScript = (callback) => {
    if (window.google && window.google.maps) {
      callback(window.google.maps);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.loading = "lazy";
      script.defer = true;
      window.document.body.appendChild(script);
      window.initMap = () => callback(window.google.maps);
    }
  };

  useEffect(() => {
    if (address) {
      loadScript((maps) => {
        const geocoder = new maps.Geocoder();

        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK") {
            setDestination(results[0].geometry.location);
          } else {
            console.error("Error geocoding address:", address);
          }
        });
      });
    }
  }, [address]);

  useEffect(() => {
    if (destination) {
      loadScript((maps) => {
        const directionsService = new maps.DirectionsService();

        const origin = {
          lat: destination.lat(),
          lng: destination.lng(),
        };
        const destinationAddress = "Accra, Ghana"; // Replace this with the actual destination address if needed

        directionsService.route(
          {
            origin: origin,
            destination: destinationAddress,
            travelMode: maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === maps.DirectionsStatus.OK) {
              setDirections(result);
              setDistance(result.routes[0].legs[0].distance.text);
            } else {
              console.error("Error fetching directions:", result);
            }
          }
        );
      });
    }
  }, [destination]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={destination}
        zoom={15}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {destination && (
          <>
            <Polyline
              path={[
                { lat: destination.lat(), lng: destination.lng() },
                { lat: 5.766230956101201, lng: 0.05077037941015217 },
              ]}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                geodesic: true,
              }}
            />
            <Marker position={destination} />
          </>
        )}
      </GoogleMap>
      {distance && <p>Distance: {distance}</p>}
    </LoadScript>
  );
};

export default HostelExactLocation;
