import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../actions/actions'
import styles from './CreateTodoPanel.less'

const DUMMY_TEXT = "Lorem ipsum dolor";

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTodoItem: (text, isDone) => {
            dispatch(Actions.addTodo(text, isDone));
            dispatch(Actions.postSingleTodoStarted(text, isDone))
        },
    };
};

@connect(null, mapDispatchToProps)
export default class CreateTodoPanel extends Component {
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

    createNewTodoItem = (event) => {
        event.preventDefault();
        this.props.createNewTodoItem(this.state.text || DUMMY_TEXT, this.state.isDone);
    };

    render() {
        return (
            <section className={styles['form-container']}>
                <form onSubmit={this.createNewTodoItem} id="create-todo-form" method="post" className={`aui`}>
                    <fieldset className={`${styles.fieldset} field-group`}>
                        <label htmlFor="create-todo">Create todo:</label>
                        <input className={`text long-field`}
                               name="create-todo"
                               placeholder="type your todo here..."
                               autoFocus
                               onChange={this.handleEdit}
                               value={this.state.text}
                               type="text"/>
                        <select onChange={this.handleChangeSelect} className="select">
                            <option>uncompleted</option>
                            <option>completed</option>
                        </select>
                        <button form="create-todo-form" className="aui-button" type="submit">
                            Create!
                        </button>
                        {/*<div className={styles.spinner}/>*/}
                        {/*<span className="aui-icon aui-icon-small aui-iconfont-success">Sucess!</span>*/}
                        {/*<span className="aui-icon aui-icon-small aui-iconfont-close-dialog">Fail! Error</span>*/}
                    </fieldset>
                </form>
            </section>
        )
    }
}