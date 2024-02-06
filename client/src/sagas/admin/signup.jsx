import { takeLatest } from "redux-saga/effects";
import {
  signUpStart,
  adminSignUpAction,
  signUpSuccess,
  signUpFail,
} from "../../features/admin/signup";
import { put, call } from "redux-saga/effects";
import { ADMINSIGNUP } from "../../apis/endpoints";
import axios from "../../apis/main";

function* signupSaga(action) {
  try {
    yield put(signUpStart());

    console.log('action.payload',action.payload)
    const formData = new FormData();
    formData.append("profilePicture", action.payload.profilePicture);
    formData.append("hostelLogo", action.payload.hostelLogo);
    formData.append("name", action.payload.name);
    formData.append("email", action.payload.email);
    formData.append("contact", action.payload.contact);
    formData.append("password", action.payload.password);
    // Send the request with the uploaded files
    console.log("formData after appending data", formData);
    const response = yield call(axios.post, ADMINSIGNUP, formData);
    

    // Handle the response (check if necessary)
    if (response.status === 200) {
      yield put(signUpSuccess(response.data));
    } else {
      yield put(signUpFail(response.data));
    }
  } catch (error) {
    yield put(signUpFail(error.response.data));
  }
}

export default function* adminSignupSaga() {
  yield takeLatest(adminSignUpAction, signupSaga);
}
