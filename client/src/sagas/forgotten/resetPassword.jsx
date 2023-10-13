import { takeLatest, put, call } from "redux-saga/effects";
import {
  loading,
  passwordSuccessful,
  passwordError,
  resetPasswordAction,
} from "../../features/resetPassword/resetPassword.jsx";
import axios from "../../apis/main.jsx";
import { ENTEREMAIL } from "../../apis/endpoints.jsx";

function* handleResetPassword(action) {
  try {
    yield put(loading());
    const response = yield call(
      axios.post,
      `${ENTEREMAIL}/${action.payload.id}/verify/${action.payload.token}`,
      action.payload.password
    );
    console.log(action.payload)
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
    yield takeLatest(resetPasswordAction, handleResetPassword)
}