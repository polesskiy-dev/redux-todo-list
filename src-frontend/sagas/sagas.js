// import {takeEvery, takeLatest} from 'redux-saga'
// import {call, put} from 'redux-saga/effects'
//
// // worker Saga: will be fired on FETCH_TODOS request actions
// function* fetchTodos(action) {
//     try {
//         const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//     } catch (e) {
//         yield put({type: "USER_FETCH_FAILED", message: e.message});
//     }
// }