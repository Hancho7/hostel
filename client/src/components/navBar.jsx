import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../features/logs/loginSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { role } = user || {}; // Ensure 'user' is defined, and if not, provide an empty object
  const dispatch = useDispatch();

  const handleMediaQueryChange = (e) => {
    if (e.matches) {
      setNav(false);
    } else {
      setNav(true);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Initial check and state setting
    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="p-4 bg-[#f8f9fa] md:flex md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <img src={logo} className="w-10 h-10 rounded-full" alt="logo" />
        <AiOutlineMenu onClick={handleNav} className="md:hidden" />
      </div>
      {nav ? (
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-20">
          <Link to="/">Home</Link>
          <Link to="/contact-us">Contact Us</Link>
          {user ? (
            // User is logged in
            <>
              {
                role === "user" ? (
                  <button onClick={() => dispatch(logout())}>Logout</button>
                ) : role === "manager" ? (
                  <>
                    <Link to="/admin">Admin</Link>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                  </>
                ) : null /* Handle other roles if needed */
              }
            </>
          ) : (
            // User is not logged in
            <>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
