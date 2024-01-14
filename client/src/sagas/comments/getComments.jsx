import { loading, comments, commentsError, readCommentAction } from "../../features/comments/getCommentslice";
import {call, put, takeLatest} from 'redux-saga/effects'
import axios from '../../apis/main'
import {READCOMMENTS} from '../../apis/endpoints'


function* handleReadComments(){
    yield put(loading())
    try {
        const response = yield call(axios.get, READCOMMENTS )
        if (response.status===200){
            yield put(comments(response.data))
        }else{
            yield put(commentsError('error loading comments'))
        }
    } catch (error) {
        yield put('error loading hostels')
        
    }
}

export function* watchGetComments(){
    yield takeLatest(readCommentAction, handleReadComments)
}