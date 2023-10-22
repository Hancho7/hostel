import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga.jsx';

// AUTHENTICATION
import signupSlice from '../features/logs/signupSlice.jsx';
import loginReducer from '../features/logs/loginSlice.jsx'
import verifyEmail from '../features/logs/verifyEmail.jsx';

// COMMENT MANAGEMENT
import createCommentSlice from '../features/comments/createCommentSlice.jsx';
import getCommentslice from '../features/comments/getCommentslice.jsx';
import hosteID from '../features/hostels/hostelID.jsx'

// RESET PASSWORD MANAGEMENT
import resetEmail from '../features/resetPassword/resetEmail.jsx';
import resetPasswordSlice from '../features/resetPassword/resetPassword.jsx';

// HOSTEL MANAGEMENT
import uploadHostelSlice from "../features/hostels/createHostel.jsx"
import hostelDisplayReducer from '../features/hostels/displayHostels.jsx'

//ROOMS
import addRoomSlice from '../features/hostels/rooms/addRooms.jsx'



// SAGA CONFIGURATION
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
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
    uploadHostel: uploadHostelSlice,

    //ROOMS
    addRoom: addRoomSlice,

  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
