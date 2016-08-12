import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Map, List} from 'immutable'
import App from './components/App'
import rootReducer from './reducers/root-reducer'

const DUMMY_INITIAL_DATA = Map({
    todos: List([
        Map({isDone: true, text: 'make components'}),
        Map({isDone: false, text: 'design actions'}),
        Map({isDone: false, text: 'implement reducer'}),
        Map({isDone: false, text: 'connect components'})
    ])
});

const store = createStore(rootReducer, DUMMY_INITIAL_DATA);

console.log("State after initializing: ", store.getState());

render(
    //Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);