import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserBookAction } from "../features/hostels/rooms/getUserBookings.jsx";

function UserBookings() {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const getUserBookings = useSelector((state) => state.getUserBooking.data);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getUserBookAction(userID));
  }, [userID, user, dispatch]);

  console.log("user bookings", getUserBookings);

  if (!getUserBookings || getUserBookings.length === 0) {
    return (
      <div className="mx-auto my-56 text-center">
        Dear <b>{user.firstName}</b>, you have not booked any hostel yet...
      </div>
    );
  }
  return (
    <div className="mx-auto my-56 text-center">
      <h2 className=" py-10 font-semibold text-lg">Your Bookings</h2>
      <div className=" flex flex-col-reverse md:flex-row-reverse w-fit mx-auto md:mx-0 md:w-full">
        <button className=" bg-[#DAA520] hover:bg-[#e6e667] rounded-tr-4 rounded-br-4">Upload reciept</button>
        <table className="shadow-lg bg-white rounded w-full flex flex-row md:flex-col">
          <thead className="bg-blue-100 ">
            <tr className=" flex flex-col md:flex md:flex-row md:justify-between items-center">
              <th className="bg-blue-100 border text-center px-2">
                Hostel Name
              </th>
              <th className="bg-blue-100 border text-center px-2 py-5 md:py-0">hostel No</th>
              <th className="bg-blue-100 border text-center px-2 py-5 md:py-0">Room Name</th>
              <th className="bg-blue-100 border text-center px-2 py-5 md:py-0">Paid</th>
              <th className="bg-blue-100 border text-center px-2 py-5 md:py-0">
                Check-In Date
              </th>
            </tr>
          </thead>
          <tbody>
            {getUserBookings.map((booking, index) => (
              <tr key={index} className=" flex flex-col md:flex md:flex-row md:content-between md:justify-between items-center">
                <td className="text-center px-2 py-5 md:py-0">{booking.hostel.name}</td>
                <td className="text-center px-2 py-5 md:py-0">{booking.hostel.phone}</td>
                <td className="text-center px-2 py-5 md:py-0">{booking.room.name}</td>
                <td className="text-center px-2 py-5 md:py-0">
                  {booking.paid ? "Yes" : "No"}
                </td>
                <td className="text-center px-2">
                  {formatDate(booking.checkInDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

export default UserBookings;
