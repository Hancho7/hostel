import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState
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
import ResetEmail from "./pages/resetEmail.jsx"
import NewPassword from "./pages/newPassword.jsx";

function App() {
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Initialize state

  return (
    <Router>
      {isEmailVerified ? null : <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<LoginWrapper />} />
        <Route path="/sign-up" element={<SignUpWrapper />} />
        <Route element={<RequireAuth allowedRoles={["user", "manager"]} />}>
          <Route path="/hostel/:id" element={<HostelDetail />} />
        </Route>
        <Route path="/forgotten-password" element={<ResetEmail/>}/>
        <Route path="/forgotten-password/:id/verify/:token" element={<NewPassword/>}/>

        <Route
          path="/verify/:id/:token"
          element={
            <EmailVerification setIsEmailVerified={setIsEmailVerified} />
          }
        />

        {/* 404 Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isEmailVerified ? null : <Footer />} {/* Conditionally render Footer */}
    </Router>
  );
}

export default App;
