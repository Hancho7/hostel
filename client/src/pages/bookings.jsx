import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetBookingsAction } from "../features/bookings/userGetBookings";

function UserBookings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.userGetBookings);
  console.log(data);

  useEffect(() => {
    dispatch(userGetBookingsAction(user._id));
  },[dispatch, user._id]);
  return <div>hello</div>;
}

export default UserBookings;
