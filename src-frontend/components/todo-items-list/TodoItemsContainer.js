import React, {Component} from 'react'
import {connect} from 'react-redux';
import TodoItem from '../todo-item/TodoItem'
import Filters from '../../actions/filters'
import style from './TodoItemsContainer.less'

class TodoItemsList extends Component {
    /*static propTypes = {
     todos: ImmutablePropTypes.listOf(PropTypes.shape({
     isDone: PropTypes.bool.isRequired,
     text: PropTypes.string.isRequired
     }).isRequired).isRequired
     };*/

    render() {
        const {todos, visibilityFilter} = this.props;
        console.log("Visibility filter: %s, todos: %s", visibilityFilter, JSON.stringify(todos));

        return (
            <section className={`${style['flex-container']}`}>
                {todos
                    .filter((todo)=> {
                            switch (visibilityFilter) {
                                case Filters.VISIBILITY_FILTER.COMPLETED:
                                    return todo.get('isDone');
                                case Filters.VISIBILITY_FILTER.UNCOMPLETED:
                                    return !todo.get('isDone');
                                case Filters.VISIBILITY_FILTER.ALL:
                                default:
                                    return true;
                            }
                        }
                    )
                    .map((todo, index) => <TodoItem
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
        todos: state.get('todos'),
        visibilityFilter: state.get('visibilityFilter')
    }
};

export default connect(mapStateToProps)(TodoItemsList)

