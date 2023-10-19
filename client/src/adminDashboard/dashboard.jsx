/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./Admin";
import GetHostel from "./pages/readHostel";
import DeleteHostel from "./pages/deleteHostel";
import CreateRooms from "./pages/createRoom";
import CreateHostel from "./pages/createHostel";
import Bookings from "./pages/bookings";

function AdminDashboard({ setIsEmailVerified }) {
  useEffect(() => {
    setIsEmailVerified(true);
  }, [setIsEmailVerified]);
  return (
    <Navigation>
      <Routes>
        <Route path="/create-hostel" element={<CreateHostel />} />
        <Route path="/display-hostel" element={<GetHostel />} />
        <Route path="/delete-hostel" element={<DeleteHostel />} />
        <Route path="/add-rooms" element={<CreateRooms />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Navigation>
  );
}

export default AdminDashboard;
