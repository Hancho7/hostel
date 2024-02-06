import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducers } from "./reducers";

// SAGA CONFIGURATION
const sagaMiddleware = createSagaMiddleware();

// PERSIST CONFIGURATION
const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "user",
    "signup",
    "verification",
    "adminSignUp",
    "adminEmailVerification",
    "adminSignIn",
  ],
};
const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
