// hostelsSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../apis/main"; // Import your Axios instance
import { USERSPECIFICHOSTELIMAGES } from "../../apis/endpoints";

import {
  specificHostelImagesAction,
  specificHostelImagesError,
  specificHostelImagesSuccess,
  specificHostelImagesLoading,
} from "../../features/hostels/specificHostelImages";

function* fetchHostelImages(action) {
  try {
    yield put(specificHostelImagesLoading());
    console.log("action.payload", action.payload);
    const response = yield call(
      axios.get,
      `${USERSPECIFICHOSTELIMAGES}/${action.payload}`
    );
    console.log("response admin:", response);

    if (response.status === 200) {
      yield put(specificHostelImagesSuccess(response.data));
    } else {
      yield put(specificHostelImagesError(response.data));
    }
  } catch (error) {
    yield put(specificHostelImagesError(error.response.data));
  }
}

export function* watchUserFetchHostelImages() {
  yield takeLatest(specificHostelImagesAction, fetchHostelImages);
}
