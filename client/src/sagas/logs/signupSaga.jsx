import { put, call, takeLatest } from "redux-saga/effects";
import axios from "../../apis/main"
import { signup, loading, signupSuccess, error } from "../../features/logs/signupSlice"
import { SIGNUP } from "../../apis/endpoints";

// Define the Redux-Saga generator function for signup
function* handleSignup(actions) {
  try {
    yield put(loading());
    const response = yield call(axios.post, SIGNUP, actions.payload);

    if (response.status === 200) {
      // Dispatch a success action with the response data
      yield put(signupSuccess(response.data));
    } else {
      // Handle error if the response status is not 200
      // You can dispatch an error action here if needed
      yield put(error("Signup failed"));
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error(error);
    yield put(error("Signup failed"));
  }
}

// Watch for SIGNUP action and run handleSignup when it occurs
export function* watchSignup() {
  yield takeLatest(signup.type, handleSignup);
}