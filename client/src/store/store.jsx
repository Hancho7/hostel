import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga.jsx";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// AUTHENTICATION
import signupSlice from "../features/logs/signupSlice.jsx";
import loginReducer from "../features/logs/loginSlice.jsx";
import verifyEmail from "../features/logs/verifyEmail.jsx";

// COMMENT MANAGEMENT
import createCommentSlice from "../features/comments/createCommentSlice.jsx";
import getCommentslice from "../features/comments/getCommentslice.jsx";
import hosteID from "../features/hostels/hostelID.jsx";

// RESET PASSWORD MANAGEMENT
import resetEmail from "../features/resetPassword/resetEmail.jsx";
import resetPasswordSlice from "../features/resetPassword/resetPassword.jsx";

// HOSTEL MANAGEMENT
import uploadHostelSlice from "../features/hostels/createHostel.jsx";
import hostelDisplayReducer from "../features/hostels/displayHostels.jsx";
import hostelDetailSlice from "../features/hostels/hostelDetail.jsx";
// ADMIN HOSTEL PARAMS REQUEST
import adminHostelSlice from "../features/hostels/adminHostels.jsx";

//ROOMS
import addRoomSlice from "../features/hostels/rooms/addRooms.jsx";
import bookingSlice from "../features/hostels/rooms/booking.jsx";
// ADMIN ROOMS
import adminRoomSlice from "../features/hostels/rooms/adminGetRooms.jsx";

// DISPLAYING BOOKINGS
import getBookingSlice from "../features/hostels/rooms/getBookings.jsx";

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
  signup: signupSlice,
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
