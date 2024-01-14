// rootSaga.js
import { all } from "redux-saga/effects";
import { watchLogin } from "./logs/loginsaga";

import { watchSignup } from "./logs/signupSaga";
import { watchVerification } from "./logs/verifyEmailSaga";
import { watchCommentCreation } from "./comments/createComments";
import { watchGetComments } from "./comments/getComments";
import { watchEmailForResetPassword } from "./forgotten/resetEmail";
import { watchResetPassword } from "./forgotten/resetPassword";

// HOSTEL MANAGEMENT
import { watchFetchHostels } from "./hostel/displayHostel";
import { watchHostelUpload } from "./hostel/createHostel";
import { watchUserFetchHostelDetail } from "./hostel/hostelDetail";

//ROOM MANAGEMENT
// CREATING ROOM
import { watchAddRoom } from "./hostel/rooms/addRooms";
// BOOKING ROOM
import { watchBooking } from "./hostel/rooms/booking";
//USER REQUESTING FOR ROOMS THROUGH PARAMS
import { watchGetUserBookings } from "./hostel/rooms/getUserBookings";
//DEIPLAYING BOOKINGS
import { watchGetBookings } from "./hostel/rooms/getBookings";
// ADMIN RQUESTING FOR HOSTELS THROUGH PARAMS
import { watchAdminFetchHostels } from "./hostel/adminHostels";
// // ADMIN RQUESTING FOR ROOMS THROUGH PARAMS
import watchGetAdminRooms from "./hostel/rooms/adminGetRooms";

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
    watchUserFetchHostelDetail(), //specific hostel detail
    watchHostelUpload(),
    // ADMINS HOSTELS
    watchAdminFetchHostels(),

    //ROOM MANAGMENT
    watchAddRoom(),
    watchBooking(),
    watchGetBookings(),
    watchGetUserBookings(),

    // ADMIN ROOM MANAGEMENT
    watchGetAdminRooms(),
  ]);
}
