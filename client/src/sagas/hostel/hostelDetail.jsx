// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main.jsx"; // Import your Axios instance
import { HOSTELDETAIL } from "../../apis/endpoints";

import {
    detailLoading,detailSuccess, detailerror ,getHostel
} from "../../features/hostels/hostelDetail.jsx";

function* fetchHostelDetail(action) {
    try {
        console.log("payload admin:", action.payload.hostelID)
      yield put(detailLoading());
      const response = yield call(axios.get, `${HOSTELDETAIL}/${action.payload.hostelID}`);
      console.log("response admin:", response)
  
      if (response.status === 200) {
        const hostels = response.data;
        yield put(detailSuccess(hostels));
      } else {
        yield put(detailerror("Failed to fetch hostels"));
      }
    } catch (error) {
      yield put(detailerror(error.message));
    }
  }
  
  export function* watchUserFetchHostelDetail() {
    yield takeLatest(getHostel, fetchHostelDetail);
  }
  