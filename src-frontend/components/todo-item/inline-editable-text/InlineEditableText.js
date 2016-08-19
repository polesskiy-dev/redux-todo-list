import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions'
import styles from './InlineEditableText.less'

const mapDispatchToProps = (dispatch) => {
    return {
        onReplaceTodoClick: (id, newText) => dispatch(Actions.replaceText(id, newText))
    };
};

@connect(null, mapDispatchToProps)
export default class InlineEditableText extends Component {
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

    handleEdit = (e)=> {
        this.setState({text: e.target.value});
    };

    finishEdit = (e)=> {
        e.stopPropagation();
        this.setState({
            isEditable: false,
        });
        this.props.onReplaceTodoClick(this.props.id, e.target.value);
    };

    render() {
        return (
            <div className={styles['editable-container']}>
                {(this.state.isEditable) ?
                    <textarea
                        className="textarea"
                        autoFocus
                        onChange={this.handleEdit} onBlur={this.finishEdit} onClick={this.finishEdit}
                        value={this.state.text}
                    />
                    :
                    <p onClick={this.startEdit}>{this.state.text}</p>
                }
            </div>
        )
    }
}



