// rootSaga.js
import { all } from 'redux-saga/effects';
import { watchLogin } from './logs/loginsaga.jsx';
import { watchFetchHostels } from './hostel/displayHostel.jsx';
import { watchSignup } from './logs/signupSaga.jsx';
import { watchVerification } from './logs/verifyEmailSaga.jsx';
import { watchCommentCreation } from './comments/createComments.jsx';
import { watchGetComments } from './comments/getComments.jsx';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchFetchHostels(),
    watchSignup(),
    watchVerification(),
    watchCommentCreation(),
    watchGetComments(),
    // Add other sagas here if needed.
  ]);
}
