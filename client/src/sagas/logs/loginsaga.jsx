// authSaga.js
import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN } from '../../apis/endpoints'; 
import axios from '../../apis/main'
import {  loading,loginError, loginSuccess, startLogin } from '../../features/logs/loginSlice';

function* handleLogin(action) {
  try {
    yield put(loading())
    const response = yield call(axios.post, LOGIN, action.payload); // Make the API call
    if (response.data === 'WrongPassword') {
      yield put(loginError('Invalid password')); // Dispatch error action
    }else if(response.data === 'EmailNoMatch'){
      yield put(loginError("Invalid Email or password"))
    }else {
      yield put(loginSuccess(response.data)); // Dispatch user action
      console.log(response)
    }
  } catch (error) {
    yield put(loginError('An error occurred during login'));
  }
}

export function* watchLogin() {
  yield takeLatest(startLogin.type, handleLogin); // Listen for login action
}
