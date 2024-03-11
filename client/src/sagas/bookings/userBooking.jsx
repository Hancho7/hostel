import {
  userBookingRoomLoading,
  userBookingRoomSuccess,
  userBookingRoomFail,
  userBookingRoomAction,
} from "../../features/bookings/userBooking";
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main";
import { USERMAKEBOOKING } from "../../apis/endpoints";

function* handleUserMakeBooking(action) {
  try {
    yield put(userBookingRoomLoading());
    const response = yield call(axios.post, USERMAKEBOOKING, action.payload);
    if (response.status === 201 || response.status === 200) {
      yield put(userBookingRoomSuccess(response.data));
    } else {
      yield put(userBookingRoomFail(response.data));
    }
  } catch (error) {
    yield put(userBookingRoomFail(error.response.data));
  }
}

export default function* watchUserMakeBooking() {
  yield takeLatest(userBookingRoomAction, handleUserMakeBooking);
}
