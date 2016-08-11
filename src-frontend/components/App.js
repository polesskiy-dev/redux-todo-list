import React, {Component} from 'react'
import NavControlBar from './nav-control-bar/NavControlBar'
import TodoItemsList from '../components/todo-items-list/TodoItemsList'

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
                <section>
                    <TodoItemsList/>
                </section>
            </div>
        );
    }
}

export default App;