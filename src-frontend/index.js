import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {List} from 'immutable'
import App from './components/App'
import rootReducer from './reducers/root-reducer'

const testTodosData = List([
    {isDone: true, text: 'make components'},
    {isDone: false, text: 'design actions'},
    {isDone: false, text: 'implement reducer'},
    {isDone: false, text: 'connect components'}
]);

const store = createStore(rootReducer, testTodosData);

console.log("State after initializing: ", store.getState());

render(
    //Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);