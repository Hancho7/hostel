import {
  nameOfHostelAction,
  namesOfHostelFail,
  namesOfHostelLoading,
  namesOfHostelSuccess,
} from "../../features/hostels/nameOfHostelForAdmin";
import axios from "../../apis/main";
import { ADMINHOSTELNAMES } from "../../apis/endpoints";
import { call, put, takeLatest } from "redux-saga/effects";

function* handleNameOfHostelForAdmin(action) {
  console.log(action.payload);
  try {
    yield put(namesOfHostelLoading());

    const response = yield call(
      axios.get,
      `${ADMINHOSTELNAMES}/${action.payload}`
    );

    if (response.status === 200) {
      yield put(namesOfHostelSuccess(response.data));
    } else {
      yield put(namesOfHostelFail(response.data));
    }
  } catch (error) {
    yield put(namesOfHostelFail(error.response.data));
  }
}

export function* watchNamesOfhostelsForAdmin() {
  yield takeLatest(nameOfHostelAction, handleNameOfHostelForAdmin);
}
