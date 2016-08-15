import React, {Component} from 'react'
import {connect} from 'react-redux';
// import ImmutablePropTypes from 'react-immutable-proptypes'
import TodoItem from '../todo-item/TodoItem'
import style from './TodoItemsContainer.less'

class TodoItemsList extends Component {
    /*static propTypes = {
     todos: ImmutablePropTypes.listOf(PropTypes.shape({
     isDone: PropTypes.bool.isRequired,
     text: PropTypes.string.isRequired
     }).isRequired).isRequired
     };*/

    render() {
        const todos = this.props.todos;

        return (
            <section className={`${style['flex-container']}`}>
                {todos.map((todo, index) => <TodoItem
                        key={index}
                        id={index}
                        todo={todo}
                    />
                )}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.get('todos')
    }
};

export default connect(mapStateToProps)(TodoItemsList)

