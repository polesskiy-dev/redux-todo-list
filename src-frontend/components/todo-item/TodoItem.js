import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions'
import styles from './TodoItem.less'
import InlineEditableText from './inline-editable-text/InlineEditableText'

class TodoItem extends Component {
    render() {
        const {id, todo, onTodoClick, onRemoveTodoClick, onReplaceTodoClick} = this.props;
        const text = todo.get('text');
        const isDone = todo.get('isDone');

        return (
            <article onClick={() => onTodoClick(id)}
                     className={`aui-message closeable ${styles.item} ${isDone ? "success" : "error"}`}>

                <p className="title">
                    <span className={`aui-icon ${isDone ? "icon-success" : "icon-error"}`}/>
                    <strong>Number: {id}</strong>
                </p>
                <InlineEditableText text={text} onFinishEdit={(newText)=>onReplaceTodoClick(id, newText)}/>

                <span onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTodoClick(id);
                }} className="aui-icon icon-close" role="button"/>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => dispatch(Actions.toggleTodo(id)),
        onRemoveTodoClick: (id) => dispatch(Actions.removeTodo(id)),
        //TODO: understand, leave it here or separate to InlineEditableText
        onReplaceTodoClick: (id, newText) => dispatch(Actions.replaceText(id, newText))
    };
};

//maybe first argument means mapStateToProps, but we already connect state to props
export default connect(null, mapDispatchToProps)(TodoItem)