import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/root-reducer'

/**
 * Entry point and our Store.
 *
 * Store is a simple obj with methods:
 * getState()
 * dispatch(action)
 * subscribe(listener)
 * replaceReducer(nextReducer)
 */
const store = createStore(rootReducer);

render(
    //Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);