import { put, call, takeLatest } from "redux-saga/effects";
import {
  verificationRequested,
  verify,
  verificationSuccess,
  verificationFailure,
} from "../../features/logs/verifyEmail";
import axios from "../../apis/main";
import { VERIFY_EMAIL } from "../../apis/endpoints";

function* verifyEmail(action) {
  yield put(verificationRequested());
  try {
    // Make the API request to verify the email with correct URL
    const response = yield call(
      axios.post,
      `${VERIFY_EMAIL}/${action.payload.id}/${action.payload.token}`, action.payload
    );
    console.log("response", response);
    if (response.status === 200) {
      yield put(verificationSuccess(response.data));
    } else {
      yield put(verificationFailure(response.data));
    }
  } catch (error) {
    console.log('error',error)
    yield put(verificationFailure(error.response.data));
  }
}

export function* watchVerification() {
  yield takeLatest(verify, verifyEmail);
}
