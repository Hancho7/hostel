import { useState, useEffect } from "react";
import first from "../../assets/part1/part1a.jpg";
import sec from "../../assets/part1/part1b.jpg";
import third from "../../assets/part1/part1c.jpg";

const Part1 = () => {
  const [images, setImages] = useState([first, sec, third]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current image index
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [images]);

  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="md:w-1/2">
        <h2 className=" font-bold text-4xl mb-6">Your best value proposition</h2>
        <p className="mb-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
          totam consectetur officiis blanditiis odit molestias repudiandae,
          dolorum doloribus ratione consequuntur, illo neque? Possimus illum
          distinctio obcaecati unde vel id labore?
        </p>
        <button className=" h-12 bg-[#18428f] w-28 rounded-sm text-white font-semibold" onClick={()=>{window.location.href='/sign-up'}}>REGISTER</button>
      </div>
      <div className=" w-full md:w-1/2 h-96">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="slideshow-image w-11/12 m-auto h-full"
        />
      </div>
    </div>
  );
};

export default Part1;
