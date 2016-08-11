import React, {Component} from 'react'
import {List} from 'immutable'
import NavControlBar from './nav-control-bar/NavControlBar'
import TodoItemsList from '../components/todo-items-list/TodoItemsList'

const testTodosData = List([
    {id: 0, isDone: true, text: 'make components'},
    {id: 1, isDone: false, text: 'design actions'},
    {id: 2, isDone: false, text: 'implement reducer'},
    {id: 3, isDone: false, text: 'connect components'}
]);

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
                    <TodoItemsList todos={testTodosData}/>
                </section>
            </div>
        );
    }
}

export default App;