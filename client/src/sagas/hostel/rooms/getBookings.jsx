import { GETBOOKING } from "../../../apis/endpoints.jsx";
import axios from "../../../apis/main.jsx";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getBookingsAction,
  bookingsLoading,
  bookingDataSuccessful,
  bookingDataFailure,
} from "../../../features/hostels/rooms/getBookings.jsx";

function* handleGetBookings(action) {
  try {
    yield put(bookingsLoading());
    console.log("payload", action.payload);
    const response = yield call(axios.get, `${GETBOOKING}/${action.payload}`);
    if (response.status === 200 || response.status === 201) {
      yield put(bookingDataSuccessful(response.data));
    } else {
      yield put(bookingDataFailure("No Bookings so far"));
    }
  } catch (error) {
    console.log("Error in fetching data", error);
    yield put(bookingDataFailure("Failed to load data"));
  }
}

export function* watchGetBookings() {
  yield takeLatest(getBookingsAction, handleGetBookings);
}
