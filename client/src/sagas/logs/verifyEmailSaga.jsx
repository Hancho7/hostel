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
      axios.get,
      `${VERIFY_EMAIL}/${action.payload.id}/${action.payload.token}`
    );
    if (response.status === 200) {
      yield put(verificationSuccess());
    } else {
      yield put(verificationFailure("Email verification failed."));
    }
  } catch (error) {
    yield put(verificationFailure("Email verification failed."));
  }
}

export function* watchVerification() {
  yield takeLatest(verify, verifyEmail);
}
