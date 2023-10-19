import {
  uploadHostelError,
  uploadHostelLoading,
  uploadHostelSuccess,
  uploadHostelAction,
} from "../../features/hostels/createHostel.jsx";
import axios from "../../apis/main.jsx";
import { UPLOADHOSTEL } from "../../apis/endpoints.jsx";
import { call, put, takeLatest } from "redux-saga/effects";

function* handleHostelUpload(action) {
  try {
    yield put(uploadHostelLoading());

    // Create a FormData object to send the form data, including files
    const formData = new FormData();
    console.log("saga",action.payload)
    for (const key in action.payload) {
        if (key === "files") {
          // Append files to FormData
          for (let i = 0; i < action.payload[key].length; i++) {
            formData.append(key, action.payload[key][i]);
          }
        } else if (key === "prices" || key === "images") {
          // Append prices and images to FormData
          formData.append(key, action.payload[key]);
        } else {
          formData.append(key, action.payload[key]);
        }
     }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Set the Content-Type for file uploads
      },
    };
    console.log("formData saga", formData);
    const response = yield call(axios.post, UPLOADHOSTEL, formData, config);
    console.log("response saga", response);

    if (response.status === 200) {
      yield put(uploadHostelSuccess(response.data));
    } else {
      yield put(uploadHostelError("Error uploading hostel"));
    }
  } catch (error) {
    yield put(uploadHostelError("Error uploading hostel"));
  }
}

export function* watchHostelUpload() {
  yield takeLatest(uploadHostelAction, handleHostelUpload);
}
