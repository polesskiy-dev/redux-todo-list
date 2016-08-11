import {connect} from 'react-redux';
//import * as components from '../components/todo-items-list/TodoItemsList';
import TodoItemsListComponent from '../components/todo-items-list/TodoItemsList'
import {addTodo, toggleTodo, removeTodo} from '../actions/actions';

const TodoItemsList = connect(
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
)(TodoItemsListComponent);

export default TodoItemsList;