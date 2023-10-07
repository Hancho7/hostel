import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import ContactUs from "./pages/contactUs";
import LoginWrapper from "./logics/loginWrapper.jsx";
import SignUpWrapper from "./logics/signupWrapper.jsx";
import EmailVerification from "./pages/verifyEmail.jsx";
import HostelDetail from "./components/homeparts/hostelDetail";

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
        <Route path="/hostel/:id" element={<HostelDetail />} />

        <Route
          path="/verify/:id/:token"
          element={<EmailVerification setIsEmailVerified={setIsEmailVerified} />}
        />
      </Routes>
      {isEmailVerified ? null : <Footer />} {/* Conditionally render Footer */}
    </Router>
  );
}

export default App;
