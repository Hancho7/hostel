import { useState } from "react";
import { useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { useParams } from "react-router-dom";

function HostelDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

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

  const handleBookClick = () => {
    // Perform booking logic or navigate to the booking page
    alert("Booking successful!");
  };

  const showAlert = () => {
    alert(
      "Would you like to book this hostel?",
      // Add a button to the alert
      [{ text: "Cancel", onPress: () => console.log("Booking canceled") },
       { text: "Book", onPress: handleBookClick }]
    );
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

      <div className="py-6">
        <div>
          <h1 className="text-center font-bold text-[#18428f] text-3xl">
            {hostel.name}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-around">
          {/* PRICES TABLE */}
          <table className="shadow-lg bg-white">
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-4">Number</th>
              <th className="bg-blue-100 border text-left px-8 py-4">Price</th>
            </tr>
            {hostel.prices.map((pricePerRoom) => (
              <tr key={pricePerRoom._id}>
                <td className="border px-8 py-4">
                  {pricePerRoom.numberInRoom}
                </td>
                <td className="border px-8 py-4">{pricePerRoom.price}</td>
              </tr>
            ))}
          </table>

          {/* HOTEL AMENITIES */}
          <div>
            <table>
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Hostel Amenities
                </th>
              </tr>
              {hostel.hostelDescription.map((item) =>
                item.split(",").map((subItem, subKey) => (
                  <tr key={subKey}>
                    <td className="border px-8 py-4">{subItem.trim()}</td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
      </div>

      {/* THE ROOMS OF EACH HOSTEL */}
      <h1>Available Rooms</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        }}
        className=" mx-[2rem] justify-evenly"
      >
        
        {hostel.fullRooms.map((room) => (
          <div
            className="shadow-lg bg-white w-14 h-14 text-center hover:cursor-pointer"
            key={room._id}
            onClick={showAlert}
          >
            <h1 className="bg-blue-100 border">{room.name}</h1>
            <p className="border ">{room.capacity} * 1</p>
          </div>
        ))}
      </div>

      {/* Add other hostel details like description, prices, etc. */}
    </div>
  );
}

export default HostelDetail;
