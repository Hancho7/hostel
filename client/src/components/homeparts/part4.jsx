import { useState, useEffect } from "react";
import hostelHome from "../../assets/hostelHome.jpg";

function Part4() {
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="h-screen flex justify-center lg:justify-start items-center p-8"
      style={{
        height: "100vh",
        backgroundImage: `url(${hostelHome})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <h1 className="text-[#18223C] font-bold text-2xl lg:text-5xl">
        Welcome to {isLargeScreen && <br />}Home Of hostels
      </h1>
    </div>
  );
}

export default Part4;
