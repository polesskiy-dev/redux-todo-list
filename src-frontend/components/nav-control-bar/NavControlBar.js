/**
 * @see https://www.npmjs.com/package/isomorphic-fetch
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import * as filters from '../../constants/filters';
import styles from './NavControlBar.less'

const mapStateToProps = (state) => {
    return {
        todos: state.get('todos')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTodoItem: (text, isDone) => dispatch(Actions.addTodo(text, isDone)),
        postTodosToServer: () => dispatch(Actions.postTodos()),
        getTodosFromServer: () => dispatch(Actions.fetchTodos()),
        viewAllTodos: ()=> dispatch(Actions.setTodosVisibilityFilter(filters.VISIBILITY_FILTER.ALL)),
        viewCompletedTodos: ()=>dispatch(Actions.setTodosVisibilityFilter(filters.VISIBILITY_FILTER.COMPLETED)),
        viewUncompletedTodos: ()=>dispatch(Actions.setTodosVisibilityFilter(filters.VISIBILITY_FILTER.UNCOMPLETED))
    };
};

/**
 * Navigation var with control buttons
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class NavControlBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isDone: false
        }
    }

    render() {
        const {postTodosToServer, getTodosFromServer, viewAllTodos, viewCompletedTodos, viewUncompletedTodos} = this.props;
        return (
            <nav className="aui-header">
                <ul className={`aui-nav ${styles['nav-list']}`}>
                    <li>
                        <a onClick={postTodosToServer} href="#">Save to server</a>
                    </li>
                    <li>
                        <a onClick={getTodosFromServer} href="#">Get from server</a>
                    </li>
                    <li className={styles.separated}>
                        <a onClick={viewAllTodos} href="#"> See all</a>
                    </li>
                    <li><a onClick={viewCompletedTodos} href="#">Only completed</a></li>
                    <li><a onClick={viewUncompletedTodos} href="#">Only uncompleted</a></li>
                </ul>
            </nav>
        )
    }
}