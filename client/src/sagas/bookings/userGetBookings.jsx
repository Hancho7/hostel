import {
  userGetBookingsAction,
  userGetBookingsFail,
  userGetBookingsLoading,
  userGetBookingsSuccess,
} from "../../features/bookings/userGetBookings";
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main";
import { USERGETBOOKING } from "../../apis/endpoints";

function* handleUserGetBooking(action) {
  try {
    yield put(userGetBookingsLoading());
    const response = yield call(
      axios.get,
      `${USERGETBOOKING}/${action.payload}`
    );
    if (response.status === 201 || response.status === 200) {
      yield put(userGetBookingsSuccess(response.data));
    } else {
      yield put(userGetBookingsFail(response.data));
    }
  } catch (error) {
    yield put(userGetBookingsFail(error.response.data));
  }
}

export default function* watchUserGetBooking() {
  yield takeLatest(userGetBookingsAction, handleUserGetBooking);
}
