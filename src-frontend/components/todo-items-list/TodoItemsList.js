import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes'
import TodoItem from '../todo-item/TodoItem'
import style from './TodoItemsList.less'

class TodoItemsList extends Component {
    static propTypes = {
        todos: ImmutablePropTypes.listOf(PropTypes.shape({
            isDone: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired).isRequired
    };

    render() {
        const todos = this.props.todos;

        return (
            <ul className={style.list}>
                {todos.map((todo, index) => <TodoItem
                        key={index}
                        id={index}
                        todo={todo}
                    />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state
    }
};

export default connect(mapStateToProps)(TodoItemsList)

