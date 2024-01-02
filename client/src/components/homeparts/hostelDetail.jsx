import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { bookAction } from "../../features/hostels/rooms/booking.jsx";
import { Carousel } from "react-responsive-carousel"; // Import Carousel from the library
import { getHostel } from "../../features/hostels/hostelDetail.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles

function HostelDetail() {
  const { hostelID } = useParams();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [roomID, setRoomID] = useState("");
  const user = useSelector((state) => state.user.user);
  const hostel = useSelector((state) => state.hostelDetail.hostel);
  const [displayStyle, setDisplayStyle] = useState("grid"); // MANAGING THE MEDIA QUERY

  useEffect(() => {
    dispatch(getHostel({ hostelID }));
  }, [dispatch, hostelID]);

  console.log(hostel);
  console.log("hostel id", hostelID);

  // MANAGING THE MEDIA QUERY
  const handleMediaQueryChange = (e) => {
    if (e.matches) {
      setDisplayStyle("flex");
    } else {
      setDisplayStyle("grid");
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

  const moveToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // // HANDLING THE POP UP MENU
  const handleOpenBookingPopup = () => {
    setIsOpen(true);
  };
  const handleCloseBookingPopup = () => {
    setIsOpen(false);
  };

  // HANDLING SUBMISSION OF ROOM AND USER DETAILS
  const handleRoomBooking = (roomID, userID) => {
    dispatch(bookAction({ roomID, userID, hostelID }));
    setIsOpen(false);
  };

  // Check if the selected hostel exists
  if(!hostel){
    return <div>Hostel does not exist</div>;
  }
  return (
    <div className="hostel-detail relative">
      {/* Background Blur */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            zIndex: "49",
          }}
        ></div>
      )}

      {/* Booking Popup */}
      {isOpen && (
        <div
          className="booking-popup fixed bg-[#e5e7e9] shadow-lg w-[80%] text-sm sm:w-[50%] lg:w-[30%] text-center font-mono font-semibold h-20 rounded-md z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-500"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>Proceed to book the room</h1>
          <div className="flex flex-row justify-around mt-4">
            <button
              className="bg-[#ff0d21] w-1/3 py-1 rounded-md hover:bg-[#cf5a64]"
              onClick={handleCloseBookingPopup}
            >
              Cancel
            </button>
            <button
              className="bg-[#18428F] w-1/3 py-1 rounded-md hover:bg-[#5f84c7]"
              onClick={() => handleRoomBooking(roomID, user._id)}
            >
              Book
            </button>
          </div>
        </div>
      )}

      {/* Image carousel */}
      <div className="my-10 mx-10 relative group">
        <Carousel
          showArrows={false}
          className="md:flex items-center justify-center"
          infiniteLoop={true}
          selectedItem={currentImageIndex}
          onClickItem={(index) => moveToImage(index)}
          onChange={(index) => setCurrentImageIndex(index)}
        >
          {hostel.imageUrl.map((link, index) => (
            <div key={index} style={{ display: "grid" }}>
              <img src={link} alt={`Room ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="py-6">
        <div>
          <h1 className="text-center font-bold text-[#18428f] text-3xl">
            {hostel.name}
          </h1>
        </div>

        <div
          style={{
            display: displayStyle,
            ...((displayStyle === "grid" && {
              gap: "2rem",
              margin: "2rem",
              gridTemplateAreas: `"amenities price"`,
              gridTemplateColumns: "auto 0fr",
              gridTemplateRows: "auto 1fr",
            }) ||
              (displayStyle === "flex" && {
                flexDirection: "column",
                alignItems: "center",
              })),
          }}
        >
          {/* PRICES TABLE */}
          <table
            style={{ gridArea: "price" }}
            className="shadow-lg bg-white rounded h-60 md:sticky top-0"
          >
            <tbody>
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Number
                </th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Price
                </th>
              </tr>
              {hostel.prices.map((pricePerRoom) => (
                <tr key={pricePerRoom._id}>
                  <td className="border px-8 py-4">
                    {pricePerRoom.numberInRoom}
                  </td>
                  <td className="border px-8 py-4">{pricePerRoom.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* AVAILABLE ROOMS AND  HOTEL AMENITIES */}
          <div style={{ gridArea: "amenities" }}>
            {/* THE ROOMS OF EACH HOSTEL */}
            <h1 className=" text-center font-semibold text-xl">
              Available Rooms
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gridTemplateRows: "auto",
                gridGap: "10px",
                gridAutoFlow: "row",
              }}
              className="mx-auto shadow-lg mb-11 mt-7 p-4"
            >
              {hostel.fullRooms.map((room) => (
                <div
                  disabled={room.remainingCapacity === 0}
                  className={`shadow-lg bg-${
                    room.remainingCapacity === 0 ? "red" : "blue"
                  } w-14 h-14 text-center hover:cursor-pointer rounded-md mx-auto`}
                  key={room._id}
                  onClick={() => {
                    handleOpenBookingPopup();
                    setRoomID(room._id);
                  }}
                >
                  <h1 className="bg-blue-100 border">{room.name}</h1>
                  <p className="border ">{room.capacity} in 1</p>
                </div>
              ))}
            </div>

            <div className="flex items-center flex-col">
              <h1 className=" text-center font-semibold text-xl">
                What this hostel offers
              </h1>
              <ol className="flex gap-5 mt-2">
                {hostel.hostelDescription.map((item) =>
                  item.split(",").map((subItem, subKey) => (
                    <li key={subKey}>
                      {subKey + 1}.{subItem.trim()}
                    </li>
                  ))
                )}
              </ol>
            </div>
            {hostel.admin && (
              <div className="w-full md:w-[60%] lg:w-[50%] mt-20 mb-8">
                <h1 className="font-semibold text-xl">
                  Hosted By {hostel.admin.firstName} {hostel.admin.lastName}
                </h1>
                <div className=" mx-auto my-5">
                  <h1>Contacts</h1>
                  <section>
                    <span
                      itemProp="telephone"
                      className="flex items-center justify-center my-4 gap-2 w-48 h-9 border-2 border-[#476faf]  text-[#476faf]"
                    >
                      <BiPhoneCall />

                      <Link to={`tel:${hostel.admin.phone}`}>Call Now</Link>
                    </span>
                    <a
                      itemProp="email"
                      href={hostel.admin.email}
                      className="flex items-center justify-center gap-2 w-48 h-9 border-2 border-[#476faf] text-[#476faf]"
                    >
                      <AiOutlineMail />
                      {hostel.admin.email}
                    </a>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add other hostel details like description, prices, etc. */}
    </div>
  );
}

export default HostelDetail;
