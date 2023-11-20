import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Components from "./pages/components.jsx";

// ADMIN DASHBOARD IMPORTS
import Admin from "./adminDashboard/Admin";
import GetHostel from "./adminDashboard/pages/readHostel";
import DeleteHostel from "./adminDashboard/pages/deleteHostel";
import CreateRooms from "./adminDashboard/pages/createRoom";
import UploadHostel from "./adminDashboard/logic/createHostel";
import Bookings from "./adminDashboard/pages/bookings";
import Room from "./adminDashboard/pages/roomRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Components />}>
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
          <Route path="/verify/:id/:token" element={<EmailVerification />} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/create-hostel" element={<UploadHostel />} />
            <Route path="/admin/" element={<GetHostel />} />
            <Route path="/admin/delete-hostel" element={<DeleteHostel />} />
            <Route path="/admin/add-rooms/:userID" element={<CreateRooms />} />
            <Route path="/admin/bookings/:id" element={<Bookings />} />
            <Route path="/admin/add-rooms/:userID/:id" element={<Room />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
