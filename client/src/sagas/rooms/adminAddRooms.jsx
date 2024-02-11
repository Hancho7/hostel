import { ADDROOMS } from "../../apis/endpoints";
import axios from "../../apis/main";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  addNewHostelRoomAction,
  addNewHostelRoomFail,
  addNewHostelRoomLoading,
  addNewHostelRoomSuccess,
} from "../../features/rooms/adminAddRooms";

function* handleAddNewHostelRoom(action) {
  try {
    yield put(addNewHostelRoomLoading());
    console.log("action.payload", action.payload);

    // Extracting data from the payload
    const {
      nameOfHostel,
      secondID,
      numberInRoom,
      roomsAvailable,
      gender,
      upgradeDescription,
      pricePerIndividual,
    } = action.payload;

    // Sending extracted data to the backend
    const response = yield call(axios.post, ADDROOMS, {
      nameOfHostel,
      secondID,
      numberInRoom,
      available: roomsAvailable, // Correcting the key to match the backend if needed
      gender,
      description: upgradeDescription, // Correcting the key to match the backend if needed
      price: pricePerIndividual, // Correcting the key to match the backend if needed
    });

    if (response.status === 201 || response.status === 200) {
      yield put(addNewHostelRoomSuccess(response.data));
    } else {
      yield put(addNewHostelRoomFail(response.data));
    }
  } catch (error) {
    yield put(addNewHostelRoomFail(error.response.data));
  }
}

export default function* watchAddNewHostelRoom() {
  yield takeLatest(addNewHostelRoomAction, handleAddNewHostelRoom);
}
