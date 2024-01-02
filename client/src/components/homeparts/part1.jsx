import { useState, useEffect } from "react";
import first from "../../assets/part1/part1a.jpg";
import sec from "../../assets/part1/part1b.jpg";
import third from "../../assets/part1/part1c.jpg";
import { useSelector } from "react-redux";

const Part1 = () => {
  const [images, setImages] = useState([first, sec, third]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current image index
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [images]);

  return (
    <div className="flex flex-col-reverse items-center gap-20">
      <div className=" my-8 w-full text-center">
        <h2 className=" font-bold text-4xl mb-6 text-center">
          Your best value proposition
        </h2>
        <p>
          Where Comfort Meets Community,<br/> Discover Your Home Away from Home with
          Glee. Explore, Connect, and Unwind,<br/> In Our Hostel Haven, Joy you'll
          Find.
        </p>
        {!user ? (
          <button
            className=" h-12 bg-[#18428f] w-28 rounded-sm text-white font-semibold hover:bg-[#7a95c7] my-9"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
          >
            REGISTER
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className=" w-full">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="slideshow-image w-11/12 m-auto h-96"
        />
      </div>
    </div>
  );
};

export default Part1;
