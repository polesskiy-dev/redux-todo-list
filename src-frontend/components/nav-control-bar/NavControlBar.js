/**
 * @see https://www.npmjs.com/package/isomorphic-fetch
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {fromJSON} from 'transit-immutable-js'
import * as Actions from '../../actions/actions';
import styles from './NavControlBar.less'

const DUMMY_TEXT = "Lorem ipsum dolor";

/**
 * Navigation var with control buttons
 */
class NavControlBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    handleEdit = (e) => {
        this.setState({text: e.target.value});
    };

    createNewTodoItem = () => {
        this.props.createNewTodoItem(this.state.text || DUMMY_TEXT);
    };

    render() {

        return (
            <nav className="aui-header">
                <ul className="aui-nav">
                    <li>
                        <a href="#"
                           onClick={this.createNewTodoItem}>Create new todo item:
                        </a>
                    </li>
                    <li>
                        <form className={`aui`}>
                            <fieldset className={`${styles.near} field-group`}>
                                <input className={`${styles.long} text`}
                                       placeholder="type your todo here..."
                                       autoFocus
                                       onChange={this.handleEdit}
                                       value={this.state.text}
                                       type="text"/>
                            </fieldset>
                        </form>
                    </li>
                    <li>
                        <a onClick={this.props.postTodosToServer} href="#">Save to server</a>
                    </li>
                    <li>
                        <a onClick={this.props.getTodosFromServer} href="#">Get from server</a>
                    </li>
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
        createNewTodoItem: (text) => dispatch(Actions.addTodo(text)),
        postTodosToServer: () => dispatch(Actions.postTodos()),
        getTodosFromServer: () => {
            fetch('/todos')
                .then(resp=>resp.text())
                .then((text)=> {
                        console.log(fromJSON(text))
                        dispatch(Actions.receiveTodos(fromJSON(text)));
                    }
                )
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavControlBar)