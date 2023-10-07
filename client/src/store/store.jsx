import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import loginReducer from '../features/logs/loginSlice.jsx'
import rootSaga from '../sagas/rootSaga.jsx';
import hostelDisplayReducer from '../features/hostels/displayHostels.jsx'
import signupSlice from '../features/logs/signupSlice.jsx';
import verifyEmail from '../features/logs/verifyEmail.jsx';
import createCommentSlice from '../features/comments/createCommentSlice.jsx';
import getCommentslice from '../features/comments/getCommentslice.jsx';
import commentsID from '../features/comments/commentsID.jsx';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: loginReducer,
    hostel: hostelDisplayReducer,
    signup: signupSlice,
    verification: verifyEmail,
    createComment: createCommentSlice,
    readComment: getCommentslice,
    commentID: commentsID,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
