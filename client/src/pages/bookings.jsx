import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserBookAction } from "../features/hostels/rooms/getUserBookings.jsx";

function UserBookings() {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const getUserBookings = useSelector((state) => state.getUserBooking.data);
  const user = useSelector((state)=> state.user.user)
  useEffect(() => {
    dispatch(getUserBookAction(userID));
    console.log(userID);
    console.log(user)
    console.log(getUserBookings);
  }, [userID, user, getUserBookings, dispatch]);

  if(!getUserBookings){
    return <div>Dear {user.firstName}, you have not booked any hostel</div>
  }
  return <div></div>;
}

export default UserBookings;
