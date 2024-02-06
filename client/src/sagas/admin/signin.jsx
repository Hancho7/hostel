import {
  signinFail,
  signinStart,
  signinSuccess,
  adminSignIn,
} from "../../features/admin/signin";
import { ADMINSIGNIN } from "../../apis/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";
import axios from "../../apis/main";

function* handleAdminSignin(action) {
  try {
    yield put(signinStart());
    console.log('action.payload', action.payload)
    const response = yield call(axios.post, ADMINSIGNIN, action.payload);
    if (response.status === 200) {
      yield put(signinSuccess(response.data));
    }
    yield put(signinFail(response.data));
  } catch (error) {
    yield put(signinFail(error.response.data));
  }
}

export default function* adminSignin() {
  yield takeLatest(adminSignIn, handleAdminSignin);
}
