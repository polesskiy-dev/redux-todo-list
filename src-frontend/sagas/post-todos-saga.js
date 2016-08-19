import 'babel-polyfill';
import Promise from 'bluebird'
import * as Actions from '../actions/actions'
import * as types from '../constants/action-types'
import {call, take, put} from 'redux-saga/effects'

Actions;
call;
put;

const wait = ms =>
    new Promise(
        (resolve, reject) => setTimeout(() => {
            resolve();
            reject;
        }, ms));

wait;


function* saveSingleTodoSaga() {
    for (; ;) {
        // Wait for the action with appropriate type and payload.status, grab payload field value from action payload.
        const {payload} = yield take((action)=>action.type === types.POST_SINGLE_TODO && action.payload.status === types.REQUEST.PENDING);
        try {
            console.log("Taken %o", payload);
            // Tell redux-saga to call wait with the specified options
            yield call(fetch, '/api/todo-items/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: payload.text, isDone: payload.isDone})
            });
            // Tell redux-saga to dispatch the tick action
            //yield put(Actions.tick())
        }
        catch
            (err) {
            console.error("Error while posting single todo to server: %s", err);
            // You get it
            //yield put(Actions.stop(err))
        }
    }
}

export default saveSingleTodoSaga