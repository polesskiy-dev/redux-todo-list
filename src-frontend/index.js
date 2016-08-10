import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import mainReducer from './reducers/main-reducer'

/**
 * It's our store
 */
const store = createStore(mainReducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);