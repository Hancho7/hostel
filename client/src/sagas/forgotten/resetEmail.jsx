import { loading, emailSent, emailError, forgottenEmail } from '../../features/resetPassword/resetEmail.jsx'
import {takeLatest, put, call} from 'redux-saga/effects'
import axios from "../../apis/main.jsx"
import {ENTEREMAIL} from "../../apis/endpoints.jsx"
function* handleEmail(action){
    try {
        yield put(loading())
        const response = yield call(axios.post,ENTEREMAIL, action.payload )
        console.log(action.payload)
        if (response.status===200) {
            yield put(emailSent(response.data))
        } else {
            yield put(emailError('failed to send Email'))
        }
    } catch (error) {
        yield put(emailError('Failed to send Email'))
    }
}

export function* watchEmailForResetPassword(){
    yield takeLatest(forgottenEmail, handleEmail)
}

