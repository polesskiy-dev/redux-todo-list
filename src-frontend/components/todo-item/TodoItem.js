import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions'
import style from './TodoItem.less'

class InlineEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            text: this.props.text
        }
    }

    startEdit = (e)=> {
        e.stopPropagation();
        this.setState({isEditable: true})
    };

    handleEdit = (e) => {
        console.log('change event');
        this.setState({message: e.target.value});
    };

    finishEdit = (e)=> {
        e.stopPropagation();
        this.setState({isEditable: false})
    };

    render() {
        const {onStartEdit, onFinishEdit} = this.props;
        let text = this.state.text;
        onStartEdit;
        onFinishEdit;

        return (

            <div>
                {(this.state.isEditable) ?
                    <input autoFocus onChange={this.handleEdit} onBlur={this.finishEdit} type="text"
                           value={text}/>
                    :
                    <p onClick={this.startEdit}>{text}</p>
                }
            </div>
        )
    }
}

class TodoItem extends Component {
    render() {
        const {id, todo, onTodoClick, onRemoveTodoClick, onReplaceTodoClick} = this.props;
        const text = todo.get('text');
        const isDone = todo.get('isDone');

        return (
            <article onClick={() => onTodoClick(id)}
                     className={`aui-message closeable ${style.item} ${isDone ? "success" : "error"}`}>

                <p className="title">
                    <span className={`aui-icon ${isDone ? "icon-success" : "icon-error"}`}/>
                    <strong>Number: {id}</strong>
                </p>
                <InlineEdit text={text} onFinishEdit={(newText)=>onReplaceTodoClick(id, newText)}/>

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
        onReplaceTodoClick: (id, newText) => dispatch(Actions.replaceText(id, newText))
    };
};

//maybe first argument means mapStateToProps, but we already connect state to props
export default connect(null, mapDispatchToProps)(TodoItem)