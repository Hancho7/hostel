import {
  addRoomLoading,
  addRoomSuccess,
  addRoomError,
  addRoomAction,
} from "../../../features/hostels/rooms/addRooms";
import axios from "../../../apis/main";
import { ADDROOMS } from "../../../apis/endpoints";
import { takeLatest, put, call } from "redux-saga/effects";

function* handleAddRooms(action) {
  try {
    yield put(addRoomLoading());
    const response = yield call(axios.post, ADDROOMS, action.payload);

    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      yield put(addRoomSuccess(data));
    } else if (response.status >= 400 && response.status < 500) {
      const error = response.data; // Assuming your server sends structured error responses
      yield put(addRoomError(error));
    } else {
      // Handle other status codes here (5xx, unexpected, etc.)
      yield put(addRoomError("An unexpected error occurred"));
    }
  } catch (error) {
    yield put(addRoomError(error.message || "An unexpected error occurred"));
  }
}

export function* watchAddRoom() {
  yield takeLatest(addRoomAction, handleAddRooms);
}
