import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {Map, List} from 'immutable'
import {toJSON, fromJSON} from 'transit-immutable-js'
import App from './components/App'
import reducer from './reducers/root-reducer'
import actionsLogger from './middleware/actions-logger'
import * as filters from './constants/filters'

const DUMMY_INITIAL_DATA = Map({
    visibilityFilter: filters.VISIBILITY_FILTER.ALL,
    todos: List([
        Map({isDone: true, text: 'make components'}),
        Map({isDone: false, text: 'design actions'}),
        Map({isDone: false, text: 'implement reducer'}),
        Map({isDone: false, text: 'connect components'})
    ])
});

/* parse data from local storage (if exists) to initial state*/
const PERSISTED_STATE = sessionStorage.getItem('reduxState') ? Map(fromJSON(sessionStorage.getItem('reduxState'))) : DUMMY_INITIAL_DATA;

/* create store and init it by initial data*/
const store = createStore(reducer, PERSISTED_STATE, applyMiddleware(actionsLogger, thunk));

/*
 * Subscribe on store change event.
 * Serialize state and save to local storage.
 */
store.subscribe(()=> {
    sessionStorage.setItem('reduxState', toJSON(store.getState()));
});

console.log("State after initializing: ", store.getState());

render(
    //Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);