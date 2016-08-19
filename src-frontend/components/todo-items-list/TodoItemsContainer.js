/**
 * Todo items list (container)
 *
 * @see https://www.npmjs.com/package/react-immutable-proptypes
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';
import {listOf, mapContains} from 'react-immutable-proptypes'
import TodoItem from '../todo-item/TodoItem'
import * as filters from '../../constants/filters'
import style from './TodoItemsContainer.less'

const mapStateToProps = (state) => {
    return {
        todos: state.get('todos'),
        visibilityFilter: state.get('visibilityFilter')
    }
};

@connect(mapStateToProps)
export default class TodoItemsList extends Component {
    static propTypes = {
        todos: listOf(mapContains(
            {
                isDone: PropTypes.bool.isRequired,
                text: PropTypes.string.isRequired
            }).isRequired)
    };

    render() {
        const {todos, visibilityFilter} = this.props;
        console.log("Visibility filter: %s, todos: %s", visibilityFilter, JSON.stringify(todos));

        return (
            <section className={`${style['flex-container']}`}>
                {todos
                    .filter((todo)=> {
                            switch (visibilityFilter) {
                                case filters.VISIBILITY_FILTER.COMPLETED:
                                    return todo.get('isDone');
                                case filters.VISIBILITY_FILTER.UNCOMPLETED:
                                    return !todo.get('isDone');
                                case filters.VISIBILITY_FILTER.ALL:
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
