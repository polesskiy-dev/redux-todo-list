/**
 * @see https://www.npmjs.com/package/isomorphic-fetch
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import Filters from '../../actions/filters';
import styles from './NavControlBar.less'

const DUMMY_TEXT = "Lorem ipsum dolor";

/**
 * Navigation var with control buttons
 */
class NavControlBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isDone: false
        }
    }

    handleChangeSelect = (e) => {
        this.setState({isDone: e.target.value === 'completed'});
        console.log(this.state)
    };

    handleEdit = (e) => {
        this.setState({text: e.target.value});
    };

    createNewTodoItem = () => {
        this.props.createNewTodoItem(this.state.text || DUMMY_TEXT, this.state.isDone);
    };

    render() {
        const {postTodosToServer, getTodosFromServer, viewAllTodos, viewCompletedTodos, viewUncompletedTodos} = this.props;
        return (
            <nav className="aui-header">
                <ul className={`aui-nav ${styles['nav-list']}`}>
                    <li>
                        <form className={`aui`}>
                            <fieldset className={`${styles.near} field-group`}>
                                <a href="#"
                                   onClick={this.createNewTodoItem}>Create new todo item:
                                </a>
                                <input className={`${styles.long} text`}
                                       placeholder="type your todo here..."
                                       autoFocus
                                       onChange={this.handleEdit}
                                       value={this.state.text}
                                       type="text"/>
                                <select onChange={this.handleChangeSelect} className="select">
                                    <option value={"uncompleted"}>uncompleted</option>
                                    <option value={"completed"}>completed</option>
                                </select>
                            </fieldset>
                        </form>
                    </li>
                    <li className={styles.separated}>
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
        viewAllTodos: ()=> dispatch(Actions.setTodosVisibilityFilter(Filters.VISIBILITY_FILTER.ALL)),
        viewCompletedTodos: ()=>dispatch(Actions.setTodosVisibilityFilter(Filters.VISIBILITY_FILTER.COMPLETED)),
        viewUncompletedTodos: ()=>dispatch(Actions.setTodosVisibilityFilter(Filters.VISIBILITY_FILTER.UNCOMPLETED))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavControlBar)