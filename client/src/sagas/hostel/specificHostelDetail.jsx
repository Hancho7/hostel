// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main"; // Import your Axios instance
import { USERSPECIFICHOSTELDETAIL } from "../../apis/endpoints";

import {
  specificHostelSuccess,
  specificHostelError,
  specificHostelDetailAction,
  specificHostelLoading,
} from "../../features/hostels/specificHostelDetail";

function* fetchHostelDetail(action) {
  try {
    yield put(specificHostelLoading());
    console.log('action.payload', action.payload)
    const response = yield call(
      axios.post,
      `${USERSPECIFICHOSTELDETAIL}/${action.payload}`
    );
    console.log("response admin:", response);

    if (response.status === 200) {
      yield put(specificHostelSuccess(response.data));
    } else {
      yield put(specificHostelError(response.data));
    }
  } catch (error) {
    yield put(specificHostelError(error.response.data));
  }
}

export function* watchUserFetchHostelDetail() {
  yield takeLatest(specificHostelDetailAction, fetchHostelDetail);
}
