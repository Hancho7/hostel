import { put, takeLatest, call } from "redux-saga/effects";
import { ADMINVERIFYEMAIL } from "../../apis/endpoints";
import axios from "../../apis/main";
import {
  verificationFail,
  verificationStart,
  verificationSuccess,
  adminVerifyEmailAction,
} from "../../features/admin/verifyEmail";

function* handleVerification(action) {
  try {
    yield put(verificationStart());

    console.log("action payload", action.payload)

    const response = yield call(
      axios.post,
      `${ADMINVERIFYEMAIL}/${action.payload.id}/hostel-search-admin/${action.payload.token}`, action.payload
    );
    console.log("successfull response",response)
    if (response.status === 200) {
      yield put(verificationSuccess(response.data));
    }
    console.log("response error",response)
    yield put(verificationFail(response.data));
  } catch (error) {
    yield put(verificationFail(error.response.data));
    console.log("response error",error.response.data)
  }
}

export default function* watchAdminVerify() {
  yield takeLatest(adminVerifyEmailAction, handleVerification);
}
