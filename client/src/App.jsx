import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navBar";
import Footer from "./components/footer";
import Home from "./pages/home";
import ContactUs from "./pages/contactUs";
import LoginWrapper from "./logics/loginWrapper.jsx";
import SignUpWrapper from "./logics/signupWrapper.jsx";
import EmailVerification from "./pages/verifyEmail.jsx";
import HostelDetail from "./components/homeparts/hostelDetail";
import RequireAuth from "./routes/privateRoute";
import NotFound from "./pages/404.jsx";
import ResetEmail from "./pages/resetEmail.jsx";
import NewPassword from "./pages/newPassword.jsx";

// ADMIN DASHBOARD IMPORTS
import Admin from "./adminDashboard/Admin";
import GetHostel from "./adminDashboard/pages/readHostel";
import DeleteHostel from "./adminDashboard/pages/deleteHostel";
import CreateRooms from "./adminDashboard/pages/createRoom";
import UploadHostel from "./adminDashboard/logic/createHostel";
import Bookings from "./adminDashboard/pages/bookings";
import Room from "./adminDashboard/pages/roomRoute";

function App() {
  const [nav, setNav] = useState(false); // Initialize state

  return (
    <Router>
      {!nav ? <Navbar /> : null} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth allowedRoles={["user", "manager"]} />}>
          <Route path="/:id" element={<HostelDetail />} />
        </Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<LoginWrapper />} />
        <Route path="/sign-up" element={<SignUpWrapper />} />
       

        {/* RESETTING FORGOTTEN PASSWORD */}
        <Route path="/forgotten-password" element={<ResetEmail />} />
        <Route
          path="/forgotten-password/:id/verify/:token"
          element={<NewPassword />}
        />

        {/* E-MAIL VERIFICATION */}
        <Route
          path="/verify/:id/:token"
          element={<EmailVerification nav={setNav} />}
        />

        {/* ADMIN DASHBOARD */}
        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route path="/admin" element={<Admin nav={setNav} />}>
            <Route path="/admin/create-hostel" element={<UploadHostel />} />
            <Route path="/admin/" element={<GetHostel />} />
            <Route path="/admin/delete-hostel" element={<DeleteHostel />} />
            <Route path="/admin/add-rooms" element={<CreateRooms />} />
            <Route path="/admin/bookings/:id" element={<Bookings />} />
            <Route path="/admin/add-rooms/:id" element={<Room/>}/>
          </Route>
        </Route>

        {/* 404 Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!nav ? <Footer /> : null} {/* Conditionally render Footer */}
    </Router>
  );
}

export default App;
