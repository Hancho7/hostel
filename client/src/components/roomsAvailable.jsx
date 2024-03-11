import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userBookingRoomAction,
  clearuserBookingRoom,
} from "../features/bookings/userBooking";
import Cliploader from "react-spinners/ClipLoader";

const RoomList = ({ rooms, userID }) => {
  const dispatch = useDispatch();
  const [bookingLoading, setBookingLoading] = useState({});
  const [bookingMessage, setBookingMessage] = useState("");

  const handleBooking = (e, hostelID, roomID, userID) => {
    e.preventDefault();
    setBookingLoading((prevLoading) => ({
      ...prevLoading,
      [roomID]: true,
    }));
    dispatch(userBookingRoomAction({ hostelID, roomID, userID }));
  };

  const { loading, message, error, success } = useSelector(
    (state) => state.userBookingRoom
  );

  useEffect(() => {
    if (success) {
      // Clear state after 3 seconds
      const timer = setTimeout(() => {
        dispatch(clearuserBookingRoom());
        setBookingLoading({});
        setBookingMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (message) {
      setBookingMessage(message);
    } else if (error) {
      setBookingMessage(error.message);
    }
  }, [message, error]);

  return (
    <div>
      <h1>Rooms</h1>
      {loading && <p>Loading...</p>}
      {bookingMessage && <p>{bookingMessage}</p>}

      <div className="grid grid-cols-5 gap-4">
        {/* Headers */}

        <div className="font-bold">Gender</div>
        <div className="font-bold">No/Room</div>
        <div className="font-bold">Available</div>
        <div className="font-bold">Price/Ghc</div>
        <div className="font-bold">Booking</div>
        

        {/* Room Details */}
        {rooms.map((room) => (
          <React.Fragment key={room._id}>
            <div>{room.gender}</div>
            <div>{room.numberInRoom}</div>
            <div>{room.remainingCapacity}</div>
            <div>{room.price}</div>
            <div>
              <button
                onClick={(e) => handleBooking(e, room.hostel, room._id, userID)}
                className="bg-red-800 hover:bg-red-600 p-2 rounded-md"
                disabled={bookingLoading[room._id]}
              >
                {bookingLoading[room._id] ? (
                  <Cliploader size={25} className="px-2" />
                ) : (
                  <span>Book</span>
                )}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
