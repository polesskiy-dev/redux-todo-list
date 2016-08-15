import React, {Component} from 'react'
import {connect} from 'react-redux';
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
                           onClick={this.createNewTodoItem}>Create new todo item
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
                </ul>
            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTodoItem: (text) => dispatch(Actions.addTodo(text)),
    };
};

export default connect(null, mapDispatchToProps)(NavControlBar)