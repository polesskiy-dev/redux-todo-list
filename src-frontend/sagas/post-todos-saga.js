import 'babel-polyfill';
import Promise from 'bluebird'
import * as Actions from '../actions/actions'
import {call, take, put} from 'redux-saga/effects'

const wait = ms =>
    new Promise(
        (resolve, reject) => setTimeout(() => {
            resolve();
            reject;
        }, ms));


function* saveScoreSaga() {
    for (; ;) {
        // Wait for the START action
        const {initialValue} = yield take('START');
        initialValue;
        try {
            // Tell redux-saga to call wait with the specified options
            yield call(wait, 1000);
            // Tell redux-saga to dispatch the tick action
            yield put(Actions.tick())
        }
        catch
            (err) {
            // You get it
            yield put(Actions.stop(err))
        }
    }
}

export default saveScoreSaga