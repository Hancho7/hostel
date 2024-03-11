import { GETUSERBOOKING } from "../../../apis/endpoints.jsx";
import axios from "../../../apis/main.jsx";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getUserBookFailure,
  getUserBookSuccess,
  getUserBookloading,
  getUserBookAction,
} from "../../../features/hostels/rooms/getUserBookings.jsx";

function* handleGetUserBookings(action) {
  try {
    yield put(getUserBookloading());
    const response = yield call(
      axios.get,
      `${GETUSERBOOKING}/${action.payload}`
    );
    if (response.status === 200 || response.status === 201) {
      yield put(getUserBookSuccess(response.data));
    } else {
      yield put(getUserBookFailure("No Bookings so far"));
    }
  } catch (error) {
    console.log("Error in fetching data", error);
    yield put(getUserBookFailure("Failed to load data"));
  }
}

export function* watchGetUserBookings() {
  yield takeLatest(getUserBookAction, handleGetUserBookings);
}