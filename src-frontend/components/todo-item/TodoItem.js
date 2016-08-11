import React, {Component} from 'react'
import {connect} from 'react-redux';
import classNames from 'classnames'
import {removeTodo} from '../../actions/actions';
import './TodoItem.less'

class TodoItem extends Component {
    render() {
        //const {removeTodo} = this.props.removeTodo;
        const onClick = this.props.onClick;
        const {id, text, isDone} = this.props.todo;

        return (
            <div className={classNames("aui-message", "closeable", isDone ? "success" : "error")}>
                <div onClick={onClick}>
                    <p className="title">
                        <span className={classNames("aui-icon ", isDone ? "icon-success" : "icon-error")}/>
                        <strong>Number: {id}</strong>
                    </p>
                    <p>{text}</p>
                </div>
                <span onClick={() => {this.props.dispatch(removeTodo(id))}} className="aui-icon icon-close" role="button"/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeTodo: id => dispatch(removeTodo(id))
    };
};

export default connect(mapDispatchToProps)(TodoItem)