import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import style from './TodoItem.less'

class TodoItem extends Component {
    render() {
        const {id, onTodoClick, onRemoveTodoClick} = this.props;
        const {text, isDone} = this.props.todo;

        return (
            <article className={`aui-message closeable ${style.item} ${isDone ? "success" : "error"}`}>
                <div onClick={() => onTodoClick(id)}>
                    <p className="title">
                        <span className={`aui-icon ${isDone ? "icon-success" : "icon-error"}`}/>
                        <strong>Number: {id}</strong>
                    </p>
                    <p>{text}</p>
                </div>
                <span onClick={() => onRemoveTodoClick(id)} className="aui-icon icon-close" role="button"/>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => dispatch(Actions.toggleTodo(id)),
        onRemoveTodoClick: (id) => dispatch(Actions.removeTodo(id))
    };
};

//maybe first argument means mapStateToProps, but we already connect state to props
export default connect(null, mapDispatchToProps)(TodoItem)