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

const postPrefItem = (todo) => {
    return fetch(
        '/api/todo-items/',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        }
    ).then(res=>res.json());
}


function* saveSingleTodoSaga() {
    for (; ;) {
        // Wait for the action with appropriate type and payload.status, grab payload field value from action payload.
        const action = yield take((action)=>action.type === types.POST_SINGLE_TODO && action.payload.status === types.REQUEST.PENDING);
        try {
            const resp = yield postPrefItem(action.payload.todo);
            console.log("Resp for posting new todo: %o", resp);
        }
        catch
            (err) {
            console.error("Error while posting single todo to server: %s", err);
        }
    }
}

export default saveSingleTodoSaga