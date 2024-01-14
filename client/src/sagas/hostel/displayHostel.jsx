// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main"; // Import your Axios instance
import { HOSTEL } from "../../apis/endpoints";

import {
  getHostels,
  hostelSuccess,
  error,
  loading,
} from "../../features/hostels/displayHostels";

function* fetchHostels() {
  try {
    yield put(loading());
    // Make an API request to fetch hostels
    const response = yield call(axios.get, HOSTEL); // Adjust the endpoint as needed

    if (response.status === 200) {
      const hostels = response.data;
      yield put(hostelSuccess(hostels));
    } else {
      yield put(error("Failed to fetch hostels"));
    }
  } catch (error) {
    yield put(error(error.message));
  }
}

export function* watchFetchHostels() {
  yield takeLatest(getHostels, fetchHostels);
}
