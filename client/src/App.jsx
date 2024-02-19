import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import ContactUs from "./pages/contactUs";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import EmailVerification from "./pages/verifyEmail";
import HostelDetail from "./components/specificHostelDetail";
import { AdminAuth, StudentAuth } from "./routes/privateRoute";
import NotFound from "./pages/404";
import ResetEmail from "./pages/resetEmail";
import NewPassword from "./pages/newPassword";
import SpecificHostelImages from "./components/specificHostelImages";
import Hostels from "./pages/hostels";
// import Components from "./pages/components";
import UserBookings from "./pages/bookings";

// ADMIN DASHBOARD IMPORTS
import Admin from "./adminDashboard/Admin";
import Overview from "./adminDashboard/pages/Overview";
import Rooms from "./adminDashboard/pages/Rooms";
import Payments from "./adminDashboard/pages/Payments";
import RoomAllotment from "./adminDashboard/pages/RoomAllotment";
import Student from "./adminDashboard/pages/Student";
import Review from "./adminDashboard/pages/Review";
import Profile from "./adminDashboard/pages/Profile";
import Unit from "./adminDashboard/pages/Unit";
import Booking from "./adminDashboard/pages/Bookings";
import AdminAdd from "./adminDashboard/pages/AdminAdd";
import AddNewHostel from "./adminDashboard/pages/AddNewHostel";

import AdminSignUp from "./adminDashboard/adminlogs/signUp";
import AdminSignIn from "./adminDashboard/adminlogs/signIn";
import VerifyEmail from "./adminDashboard/adminlogs/verifyEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<StudentAuth />}>
          <Route path="/hostels/:hostelID" element={<HostelDetail />} />
        </Route>
        <Route element={<StudentAuth />}>
          <Route
            path="/hostels/:hostelID/images"
            element={<SpecificHostelImages />}
          />
        </Route>
        <Route element={<StudentAuth />}>
          <Route path="/hostels" element={<Hostels />} />
        </Route>
        <Route element={<StudentAuth />}>
          <Route path="/user/:userID" element={<UserBookings />} />
        </Route>

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* RESETTING FORGOTTEN PASSWORD */}
        <Route path="/forgotten-password" element={<ResetEmail />} />
        <Route
          path="/forgotten-password/:id/verify/:token"
          element={<NewPassword />}
        />
        {/* E-MAIL VERIFICATION */}

        {/* 404 Catch-all route */}
        <Route path="*" element={<NotFound />} />

        <Route path="/verify/:id/:token" element={<EmailVerification />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin/sign-up" element={<AdminSignUp />} />
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route
          path="/admin/verifying-your-email/:id/hostel-search-admin/:token"
          element={<VerifyEmail />}
        />
        <Route element={<AdminAuth />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin" element={<Navigate to="/admin/Overview" />} />
            <Route path="/admin/Overview" element={<Overview />} />
            <Route path="/admin/Add" element={<AdminAdd />} />
            <Route path="/admin/Rooms" element={<Rooms />} />
            <Route path="/admin/Payments" element={<Payments />} />
            <Route path="/admin/Room-Allotment" element={<RoomAllotment />} />
            <Route path="/admin/Student" element={<Student />} />
            <Route path="/admin/Review" element={<Review />} />
            <Route path="/admin/Profile" element={<Profile />} />
            <Route path="/admin/Unit" element={<Unit />} />
            <Route path="/admin/Bookings" element={<Booking />} />
            <Route path="/admin/Add-New-hostel" element={<AddNewHostel />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
