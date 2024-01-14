import {call, put, takeLatest} from 'redux-saga/effects'
import { createCommentAction,loading, comments, commentsError } from '../../features/comments/createCommentSlice'
import {CREATECOMMENTS} from '../../apis/endpoints'
import axios from '../../apis/main'

function* handleComments(action){
    yield loading()
    try {
        const response = yield call(axios.post, CREATECOMMENTS, action.payload )
        if(response.status===200){
            yield put(comments(response.data))
        }else{
            yield put(commentsError('Failed to upload comment'))
        }
    } catch (error) {
        yield put(commentsError('Failed to upload comment')) 
    }    
}

export function* watchCommentCreation(){
    yield takeLatest(createCommentAction, handleComments)
}