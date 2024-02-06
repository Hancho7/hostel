import { put, call, takeLatest } from "redux-saga/effects";
import axios from "../../apis/main";
import {
  signup,
  startLoading,
  signupSuccess,
  signupError,
} from "../../features/logs/signupSlice";
import { SIGNUP } from "../../apis/endpoints";

// Define the Redux-Saga generator function for signup
function* handleSignup(action) {
  try {
    yield put(startLoading());

    const formData = new FormData();
    formData.append("profilePicture", action.payload.profilePicture);
    formData.append("name", action.payload.name);
    formData.append("email", action.payload.email);
    formData.append("password", action.payload.password);

    console.log("formData after appending data", formData); // Log the formData object after appending data

    const response = yield call(axios.post, SIGNUP, formData);

    if (response.status === 200) {
      yield put(signupSuccess(response.data));
    } else {
      yield put(signupError(response.data));
    }
  } catch (error) {
    console.error(error);

    // Handle network errors or unexpected errors
    const errorMessage = error.response?.data?.message || "An unexpected error occurred";

    yield put(signupError(errorMessage));
  }
}

export function* watchSignup() {
  yield takeLatest(signup, handleSignup);
}
