import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../features/logs/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar({ bgColor, position, zIndex }) {
  const Navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const user = useSelector((state) => state.user.user);
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

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleNav = () => {
    setTimeout(() => {
      setNav(!nav);
    }, 500);
  };

  const navbarStyle = {
    backgroundColor: bgColor || "transparent",
    position: position === "sticky" ? "sticky" : "static",
    top: position === "sticky" ? 0 : "auto",
    zIndex: zIndex || 0,
  };

  return (
    <div
      className="py-8 px-3 lg:px-7 md:flex md:flex-row md:items-center md:justify-between"
      style={navbarStyle}
    >
      <div className="flex items-center justify-between">
        <img
          src={logo}
          className="w-10 h-10 rounded-full hover:cursor-pointer"
          onClick={() => Navigate("/")}
          alt="logo"
        />
        <AiOutlineMenu onClick={handleNav} className="md:hidden duration-700" />
      </div>
      {nav ? (
        <div className="flex text-white font-semibold flex-col items-center gap-y-4 md:flex-row md:gap-x-20 duration-700">
          <Link className="h-full" to="/">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/hostels">Hostels</Link>
              <Link to="/contact-us">Contact</Link>
              <Link to={`/user/${user._id}`}>Bookings</Link>

              <button
                className="bg-[#b03434] w-20 h-8 font-semibold text-white rounded hover:bg-[#7a95c7]"
                onClick={() => {
                  Navigate("/");
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </>
          ) : (
            // User is not logged in
            <>
              <Link to="/contact-us">Contact</Link>
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
