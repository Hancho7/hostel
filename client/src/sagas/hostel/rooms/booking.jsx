import {
    bookAction, bookFailure, bookloading, bookSuccess
  } from '../../../features/hostels/rooms/booking.jsx';
  import axios from '../../../apis/main.jsx';
  import { BOOKING } from '../../../apis/endpoints.jsx';
  import { takeLatest, put, call } from 'redux-saga/effects';

  function* handleBooking (action){
    try {
        yield put(bookloading(true))
        const response = yield call(axios.post, BOOKING, action.payload)
        if (response.status >= 200 && response.status < 300) {
            const data = response.data;
            yield put(bookSuccess(data));
          } else if (response.status >= 400 && response.status < 500) {
            const error = response.data; // Assuming your server sends structured error responses
            yield put(bookFailure(error));
          } else {
            // Handle other status codes here (5xx, unexpected, etc.)
            yield put(bookFailure('An unexpected error occurred'));
          }
    } catch (error) {
        yield put(bookFailure('Error occured during booking'))
    }
  }

  export function* watchBooking(){
    yield takeLatest(bookAction,handleBooking);
  
  }