import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

// HOSTEL MANAGEMENT
import uploadHostelSlice from "../features/hostels/createHostel";
import hostelDisplayReducer from "../features/hostels/displayHostels";
import hostelDetailSlice from "../features/hostels/hostelDetail";
// ADMIN HOSTEL PARAMS REQUEST
import adminHostelSlice from "../features/hostels/adminHostels";

//ROOMS
import addRoomSlice from "../features/hostels/rooms/addRooms";
import bookingSlice from "../features/hostels/rooms/booking";

// USER REQUESTING BOOKINGS THROUGH PARAMS
import getUserBookSlice from "../features/hostels/rooms/getUserBookings";
// ADMIN ROOMS
import adminRoomSlice from "../features/hostels/rooms/adminGetRooms";

// DISPLAYING BOOKINGS
import getBookingSlice from "../features/hostels/rooms/getBookings";

// SAGA CONFIGURATION
const sagaMiddleware = createSagaMiddleware();

// PERSIST CONFIGURATION
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
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

  // HOSTEL MANAGEMENT
  hostel: hostelDisplayReducer,
  hostelDetail: hostelDetailSlice,
  uploadHostel: uploadHostelSlice,
  // ADMIN HOSTELS PARAMS REQUEST
  adminHostel: adminHostelSlice,

  //ROOMS
  addRoom: addRoomSlice,
  book: bookingSlice,
  Bookings: getBookingSlice,
  getUserBooking: getUserBookSlice,
  // ADMIN ROOMS
  adminGetRoom: adminRoomSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
