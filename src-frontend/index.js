import React from 'react'
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
import {App} from './components/App'

/**
 * It's our store
 */
// let store = createStore(
//     todoApp
// );

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById('app-root')
);