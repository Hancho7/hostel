import { takeLatest, put, call } from "redux-saga/effects";
import {
  loading,
  passwordSuccessful,
  passwordError,
  resetPasswordAction,
} from "../../features/resetPassword/resetPassword";
import axios from "../../apis/main";
import { NEWPASSWORD } from "../../apis/endpoints";

function* handleResetPassword(action) {
  try {
    console.log("action.payload", action.payload);
    yield put(loading());
    const response = yield call(
      axios.post,
      NEWPASSWORD,
      action.payload
    );

    if (response.status === 200) {
      yield put(passwordSuccessful(response.data));
    } else {
      yield put(passwordError("Failed to change password"));
    }
  } catch (error) {
    yield put(passwordError("Failed to change password"));
  }
}

export function* watchResetPassword() {
  yield takeLatest(resetPasswordAction, handleResetPassword);
}
