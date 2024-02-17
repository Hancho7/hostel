// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main"; // Import your Axios instance
import { ALLHOSTELS } from "../../apis/endpoints";

import {
  allHostelsForUserAction,
  allHostelsForUserSuccess,
  allHostelsForUserLoading,
  allHostelsForUserFail,
} from "../../features/hostels/getAllHostelsForUser";

function* fetchAllhostelsForUser() {
  try {
    yield put(allHostelsForUserLoading());
    // Make an API request to fetch hostels
    const response = yield call(axios.get, ALLHOSTELS); // Adjust the endpoint as needed

    if (response.status === 200) {
      yield put(allHostelsForUserSuccess(response.data));
    } else {
      yield put(allHostelsForUserFail(response.data));
    }
  } catch (error) {
    yield put(allHostelsForUserFail(error.response.data));
  }
}

export function* watchUserGetAllHostels() {
  yield takeLatest(allHostelsForUserAction, fetchAllhostelsForUser);
}
