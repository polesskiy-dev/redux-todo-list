import React, {Component} from 'react'
import NavControlBar from './nav-control-bar/NavControlBar'
import TodoItemsContainer from './todo-items-list/TodoItemsContainer'
import CreateTodoPanel from './create-todo-panel/CreateTodoPanel'

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
                <section className="aui-page-panel">
                    <CreateTodoPanel/>
                    <TodoItemsContainer/>
                </section>
            </div>
        );
    }
}

export default App;