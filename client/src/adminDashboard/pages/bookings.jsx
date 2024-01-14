import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingsAction } from "../../features/hostels/rooms/getBookings";

function Bookings() {
  const user = useSelector((state) => state.user.user);
  const bookings = useSelector((state) => state.Bookings.bookingData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingsAction(user._id));
  }, [dispatch, user._id]);

  console.log("bookings", bookings);

  // Check if bookings is null or undefined before using forEach
  const groupedBookings = {};
  bookings?.forEach((booking) => {
    const hostelName = booking.hostel.name;
    if (!groupedBookings[hostelName]) {
      groupedBookings[hostelName] = [];
    }
    groupedBookings[hostelName].push(booking);
  });

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center">Bookings</h1>
      {Object.keys(groupedBookings).map((hostelName, index) => (
        <div key={index} className=" mt-10">
          <h2 className="text-center text-lg font-semibold mb-4">{hostelName}</h2>
          <table className="m-auto">
            <thead>
              <tr className="bg-[#1D1E60] border text-left px-8 py-6">
                <th className=" text-center">#</th>
                <th className=" text-center">User</th>
                <th className=" text-center">Phone</th>
                <th className=" text-center">Email</th>
                <th className=" text-center">Room</th>
                <th className=" text-center">Payment</th>
              </tr>
            </thead>
            <tbody>
              {groupedBookings[hostelName].map((booking, subIndex) => (
                <tr key={subIndex} className="border px-8 py-4">
                  <td className="border px-8 py-4">{subIndex + 1}</td>
                  <td className="border px-8 py-4">{`${booking.user.firstName} ${booking.user.lastName}`}</td>
                  <td className="border px-8 py-4">{booking.user.phone}</td>
                  <td className="border px-8 py-4">{booking.user.email}</td>
                  <td className="border px-8 py-4">{booking.room.name}</td>
                  <td className="border px-8 py-4">{booking.paid ? "Paid" : "Pending..."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Bookings;
