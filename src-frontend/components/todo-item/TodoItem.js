import React, {Component} from 'react'
import classNames from 'classnames'
import './TodoItem.less'

export default class TodoItem extends Component {
    render() {
        const {onClick} = this.props;
        const {id, text, isDone} = this.props.todo;
        return (
            <div onClick={onClick} className={classNames("aui-message", isDone ? "success" : "error")}>
                <p className="title">
                    <span className={classNames("aui-icon ", isDone ? "icon-success" : "icon-error")}/>
                    <strong>Number: {id}</strong>
                </p>
                <p>{text}</p>
            </div>
        );
    }
}

