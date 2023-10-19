import { useState } from "react";
import { useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { useParams } from "react-router-dom";

function HostelDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {id} = useParams()
 
  const hostels = useSelector((state) => state.hostel.hostel);
 

  // Custom function to find the selected hostel by ID
  const findHostelById = (id) => {
    return hostels.find((hostel) => hostel._id === id);
  };

  // Find the selected hostel by ID
  const hostel = findHostelById(id);

  // Check if the selected hostel exists
  if (!hostel) {
    return <div>Hostel not found</div>;
  }

  const handlePreviousImage = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide
      ? hostel.imageUrl.length - 1
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextImage = () => {
    const isLastSlide = currentImageIndex === hostel.imageUrl.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };
  const moveToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="hostel-detail">
      {/* Image carousel */}
      <div className="my-10 mx-10 relative group">
        <div
          className="h-[530px] duration-500 rounded-2xl bg-center bg-cover"
          style={{
            backgroundImage: `url(${hostel.imageUrl[currentImageIndex]})`,
          }}
        ></div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2x1 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={handleNextImage} size={30} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2x1 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={handlePreviousImage} size={30} />
        </div>

        <div className="flex justify-center py-2">
          {hostel.imageUrl.map((link, index) => (
            <div key={index} onClick={() => moveToImage(index)}>
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>
        <h1 className="text-center font-bold text-[#18428f] text-3xl">{hostel.name}</h1>
        </div>
        
        <ul>
          {hostel.prices.map((price, index) => (
            <li key={index}>{price}</li>
          ))}
        </ul>
      </div>

      {/* Add other hostel details like description, prices, etc. */}
    </div>
  );
}

export default HostelDetail;
