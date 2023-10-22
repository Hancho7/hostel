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

    const formData = new FormData();

    // Append files without the index
    action.payload.files.forEach((file) => {
      formData.append("files", file);
    });

    for (const key in action.payload) {
      if (key !== "files") {
        if (key === "prices") {
          action.payload[key].forEach((price, index) => {
            formData.append(`prices[${index}][numberInRoom]`, price.numberInRoom);
            formData.append(`prices[${index}][price]`, price.price);
          });
        } else {
          formData.append(key, action.payload[key]);
        }
      }
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = yield call(axios.post, UPLOADHOSTEL, formData, config);

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
