import { ADDNEWHOSTEL } from "../../apis/endpoints";
import axios from "../../apis/main";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  addNewHostelAction,
  addNewHostelFail,
  addNewHostelLoading,
  addNewHostelSuccess,
} from "../../features/hostels/addNewHostel";

function* handleAddNewHostel(action) {
  try {
    yield put(addNewHostelLoading());
    console.log(action.payload);
    const formData = new FormData();
    formData.append("nameOfHostel", action.payload.nameOfHostel);
    formData.append("phoneNumber", action.payload.phoneNumber);
    action.payload.images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    formData.append("description", action.payload.description);
    formData.append("address[Latitude]", action.payload.address.Latitude);
    formData.append("address[Longitude]", action.payload.address.Longitude);
    formData.append(
      "address[formattedAddress]",
      action.payload.address.formattedAddress
    );
    formData.append("address", action.payload.address);
    formData.append("description", action.payload.description || "");
    const response = yield call(axios.post, ADDNEWHOSTEL, formData);
    if (response.status === 201) {
      yield put(addNewHostelSuccess(response.data));
    } else {
        yield put(addNewHostelFail(response.data));
    }
  } catch (error) {
    yield put(addNewHostelFail(error.response.data))
  }
}


export default function* watchAddNewHostel(){
    yield takeLatest(addNewHostelAction, handleAddNewHostel)
}