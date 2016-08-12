import React, {Component} from 'react'
import NavControlBar from './nav-control-bar/NavControlBar'
import TodoItemsContainer from './todo-items-list/TodoItemsContainer'

/**
 * Root component
 */
class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <NavControlBar/>
                </header>
                <TodoItemsContainer/>
            </div>
        );
    }
}

export default App;