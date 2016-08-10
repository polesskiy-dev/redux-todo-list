import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes'
import TodoItem from '../todo-item/TodoItem'
import {addTodo, toggleTodo, removeTodo} from '../../actions/actions';

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
        return (
            <ul className='todo-list'>
                {todos.map(todo => <TodoItem
                        key={todo.id}
                        todo={todo}
                        onClick={() => {
                            this.props.toggleTodo(todo.id)
                        }}
                    />
                )}
            </ul>
        )
    }
}


const mapStateToProps = ({todos}) => ({
    todos
});


export const TodoItemsList = connect(
    function mapStateToProps(state) {
        return {todos: state};
    },
    function mapDispatchToProps(dispatch) {
        return {
            addTodo: text => dispatch(addTodo(text)),
            toggleTodo: id => dispatch(toggleTodo(id)),
            removeTodo: id => dispatch(removeTodo(id))
        };
    }
)(components.TodoItemsList);
