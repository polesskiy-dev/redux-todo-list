import React, {Component} from 'react'
import styles from './InlineEditableText.less'

class InlineEditableText extends Component {
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
            text: e.target.value
        });
        this.props.onFinishEdit(this.state.text);
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

export default InlineEditableText;