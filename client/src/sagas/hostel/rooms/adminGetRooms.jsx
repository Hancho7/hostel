import {
  getAdminRoomsStarted,
  getAdminRoomsSuccess,
  getAdminRoomsFailed,
  adminGetRooms,
} from "../../../features/hostels/rooms/adminGetRooms";
import { put, call, takeLatest } from "redux-saga/effects";
import axios from "../../../apis/main";
import { ADDROOMS } from "../../../apis/endpoints";

function* handleAdminGetRooms(action) {
  try {
    yield put(getAdminRoomsStarted());
    const response = yield call(
      axios.get,
      `${ADDROOMS}/${action.payload.userID}/${action.payload.id}`
    );
    if (response.status === 200) {
        const rooms = response.data;
        yield put(getAdminRoomsSuccess(rooms));
      } else {
        yield put(getAdminRoomsFailed("No rooms so far"));
      }
  } catch (error) {
    console.log(error);
    yield put(getAdminRoomsFailed("No rooms so far"))
  }
}

function* watchGetAdminRooms(){
    yield takeLatest(adminGetRooms,handleAdminGetRooms)
}

export default watchGetAdminRooms;