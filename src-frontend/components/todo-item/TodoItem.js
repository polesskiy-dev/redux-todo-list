import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions'
import styles from './TodoItem.less'
import InlineEditableText from './inline-editable-text/InlineEditableText'

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => dispatch(Actions.toggleTodo(id)),
        onRemoveTodoClick: (id) => dispatch(Actions.removeTodo(id))
    };
};

@connect(null, mapDispatchToProps)
export default class TodoItem extends Component {
    render() {
        const {id, todo, onTodoClick, onRemoveTodoClick} = this.props;
        const text = todo.get('text');
        const isDone = todo.get('isDone');

        return (
            <article onClick={() => onTodoClick(id)}
                     className={`aui-message closeable ${styles.item} ${isDone ? "success" : "error"}`}>

                <p className="title">
                    <span className={`aui-icon ${isDone ? "icon-success" : "icon-error"}`}/>
                    <strong>Number: {id}</strong>
                </p>
                <InlineEditableText text={text} id={id}/>

                <span onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTodoClick(id);
                }} className="aui-icon icon-close" role="button"/>
            </article>
        );
    }
}