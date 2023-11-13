// rootSaga.js
import { all } from "redux-saga/effects";
import { watchLogin } from "./logs/loginsaga.jsx";

import { watchSignup } from "./logs/signupSaga.jsx";
import { watchVerification } from "./logs/verifyEmailSaga.jsx";
import { watchCommentCreation } from "./comments/createComments.jsx";
import { watchGetComments } from "./comments/getComments.jsx";
import { watchEmailForResetPassword } from "./forgotten/resetEmail.jsx";
import { watchResetPassword } from "./forgotten/resetPassword.jsx";

// HOSTEL MANAGEMENT
import { watchFetchHostels } from "./hostel/displayHostel.jsx";
import { watchHostelUpload } from "./hostel/createHostel.jsx";

//ROOM MANAGEMENT
// CREATING ROOM
import { watchAddRoom } from "./hostel/rooms/addRooms.jsx";
// BOOKING ROOM
import { watchBooking } from "./hostel/rooms/booking.jsx";
//DEIPLAYING BOOKINGS
import {watchGetBookings} from "./hostel/rooms/getBookings.jsx"

export default function* rootSaga() {
  yield all([
    // AUTHENTICATION
    watchLogin(),
    watchSignup(),
    watchVerification(),
   
    // RESET PASSWORD MANAGEMENT
    watchEmailForResetPassword(),
    watchResetPassword(),

    // COMMNENTS MANAGEMENT
    watchCommentCreation(),
    watchGetComments(),

    // HOSTEL MANAGEMENT
    watchFetchHostels(),
    watchHostelUpload(),
    
    //ROOM MANAGMENT
    watchAddRoom(),
    watchBooking(),
    watchGetBookings(),
  ]);
}
