import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

/**
 * It's our store
 */
// let store = createStore(
//     todoApp
// );

render(
    <Provider /*store={store}*/>
        <App />
    </Provider>,
    document.getElementById('app')
);