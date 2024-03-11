// AUTHENTICATION
import SignupSlice from "../features/logs/signupSlice";
import loginReducer from "../features/logs/loginSlice";
import verifyEmail from "../features/logs/verifyEmail";

// COMMENT MANAGEMENT
import createCommentSlice from "../features/comments/createCommentSlice";
import getCommentslice from "../features/comments/getCommentslice";
import hosteID from "../features/hostels/hostelID";

// RESET PASSWORD MANAGEMENT
import resetEmail from "../features/resetPassword/resetEmail";
import resetPasswordSlice from "../features/resetPassword/resetPassword";

// ADMIN SIGNING UP AND VERIFYING
import adminSignupSlice from "../features/admin/signup";
import adminSigninSlice from "../features/admin/signin";
import adminEmailVerificationSlice from "../features/admin/verifyEmail";

// ADMIN HOSTEL
import addNewHostelSlice from "../features/hostels/addNewHostel";
import namesOfHostelSlice from "../features/hostels/nameOfHostelForAdmin";

// HOME PAGE HOSTELS
import homePageGetHostelsSlice from "../features/hostels/homePageHostels";

// ALL HOSTELS
import allHostelsSlice from "../features/hostels/getAllHostelsForUser";

// USER REQUESTING FOR SPECIFIC HOSTEL DETAIL
import specificHostelDetailSlice from "../features/hostels/specificHostelDetail";

// USER REQUESTING FOR SPECIFIC HOSTEL IMAGES
import imagesFromSpecificHostelSlice from "../features/hostels/specificHostelImages";

// ROOM MANAGMENT
import addnewhostelRoomSlice from "../features/rooms/adminAddRooms";

//BOOKINGS
import userBookingSlice from "../features/bookings/userBooking";
import userGetBookingsSlice from "../features/bookings/userGetBookings";

export const reducers = {
  // AUTHENTICATION
  user: loginReducer,
  signup: SignupSlice,
  verification: verifyEmail,

  // COMMENT MANAGEMENT
  createComment: createCommentSlice,
  readComment: getCommentslice,
  hostelID: hosteID,

  // RESET PASSWORD MANAGEMENT
  email: resetEmail,
  resetPassword: resetPasswordSlice,

  //ADMIN SIGNING UP
  adminSignUp: adminSignupSlice,
  adminEmailVerification: adminEmailVerificationSlice,
  adminSignIn: adminSigninSlice,

  // ADMIN HOSTEL
  addnewhostel: addNewHostelSlice,
  namesOfHostel: namesOfHostelSlice,

  // HOME PAGE HOSTEL
  homePageHostels: homePageGetHostelsSlice,
  // GETTING ALL HOSTELS BY THE CURRENT LOGGED IN USER
  allHostelsForUser: allHostelsSlice,

  // USER REQUESTING FOR SPECIFIC HOSTEL DETAILS
  specificHostelDetail: specificHostelDetailSlice,

  // USER REQUESTING FOR SPECIFIC HOSTEL IMAGES
  specificHostelImages: imagesFromSpecificHostelSlice,

  // ROOMS
  addnewhostelRoom: addnewhostelRoomSlice,

  // BOOKINGS
  userBookingRoom: userBookingSlice,
  userGetBookings: userGetBookingsSlice,
};
