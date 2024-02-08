// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main"; // Import your Axios instance
import { HOMEPAGEHOSTEL } from "../../apis/endpoints";

import {
  homePageGetHostelsAction,
  homePageHostelsSuccess,
  homePageHostelsLoading,
  homePageHostelsFail,
} from "../../features/hostels/homePageHostels";

function* fetchHomePageHostels() {
  try {
    yield put(homePageHostelsLoading());
    // Make an API request to fetch hostels
    const response = yield call(axios.get, HOMEPAGEHOSTEL); // Adjust the endpoint as needed

    if (response.status === 200) {
      yield put(homePageHostelsSuccess(response.data));
    } else {
      yield put(homePageHostelsFail(response.data));
    }
  } catch (error) {
    yield put(homePageHostelsFail(error.response.data));
  }
}

export function* watchHomePageHostels() {
  yield takeLatest(homePageGetHostelsAction, fetchHomePageHostels);
}
