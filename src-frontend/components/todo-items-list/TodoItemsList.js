import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux';
import {toggleTodo} from '../../actions/actions';
import ImmutablePropTypes from 'react-immutable-proptypes'
import TodoItem from '../todo-item/TodoItem'
import './TodoItemsList.less'

class TodoItemsList extends Component {
    static propTypes = {
        todos: ImmutablePropTypes.listOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            isDone: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired).isRequired//,
        //onTodoClick: PropTypes.func.isRequired
    };

    render() {
        const todos = this.props.todos;
        const dispatch = this.props.dispatch;

        return (
            <ul className='todo-list'>
                {todos.map(todo => <TodoItem
                        key={todo.id}
                        todo={todo}
                        onClick={() => {
                            dispatch(toggleTodo(todo.id))
                        }}
                    />
                )}
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id))
    };
};

export default connect(mapDispatchToProps)(TodoItemsList)

