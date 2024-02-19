import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ images, hostelID }) => {
  console.log("images", images);
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleAllHostelImages = (e, hostelID) => {
    e.preventDefault();
    navigate(`/hostels/${hostelID}/images`);
  };

  return (
    <div>
      <div
        className="flex flex-col justify-center md:flex-row px-6 gap-y-4 py-4 md:gap-x-4"
        style={{ alignItems: screenWidth ? "normal" : "center" }}
      >
        <div className="w-full md:w-[60%] flex">
          <img
            className="w-full h-full md:rounded-tl-lg md:rounded-bl-lg"
            src={images[selectedImageIndex]}
            alt={`Image ${selectedImageIndex + 1}`}
          />
        </div>
        <div className="w-[40%] relative flex justify-center gap-2 md:grid md:grid-cols-2">
          <button
            onClick={(e) => handleAllHostelImages(e, hostelID)}
            className="p-3 rounded-lg font-semibold bottom-3 left-2/3 bg-[#d4d4d4] hover:bg-[#969595] absolute"
          >
            more
          </button>
          {images.map((image, index) => (
            <img
              className="w-20 h-16 md:w-full md:h-full"
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              onClick={() => handleClick(index)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
