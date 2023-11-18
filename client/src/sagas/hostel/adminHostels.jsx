// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main.jsx"; // Import your Axios instance
import { ADMINHOSTELS } from "../../apis/endpoints";

import {
    loadingAdminHostels,adminHostelSuccess, adminHostelError ,adminGetHostels
} from "../../features/hostels/adminHostels.jsx";

function* fetchAdminHostels(action) {
    try {
        console.log("payload admin:", action.payload.userID)
      yield put(loadingAdminHostels());
      const response = yield call(axios.get, `${ADMINHOSTELS}/${action.payload.userID}`);
      console.log("response admin:", response)
  
      if (response.status === 200) {
        const hostels = response.data;
        yield put(adminHostelSuccess(hostels));
      } else {
        yield put(adminHostelError("Failed to fetch hostels"));
      }
    } catch (error) {
      yield put(adminHostelError(error.message));
    }
  }
  
  export function* watchAdminFetchHostels() {
    yield takeLatest(adminGetHostels, fetchAdminHostels);
  }
  