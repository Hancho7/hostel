import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const apiKey = import.meta.env.VITE_API_KEY;

function Bookings() {
  const [position, setPosition] = useState(null);

  const onMapClick = (event) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Geocode the clicked location
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: clickedPosition }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          console.log("Latitude:", clickedPosition.lat);
          console.log("Longitude:", clickedPosition.lng);
          console.log("Geocoded location:", results[0].formatted_address);
        }
      } else {
        console.error("Geocode error:", status);
      }
    });

    setPosition(clickedPosition);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10} // Adjust the zoom level as needed
        onClick={onMapClick}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default Bookings;
