import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import './NavControlBar.less'

const DUMMY_TEXT = "Lorem ipsum dolor";

/**
 * Navigation var with control buttons
 */
class NavControlBar extends Component {
    render() {
        return (
            <nav className="aui-navgroup aui-navgroup-horizontal separated-nav-bar">
                <div className="aui-navgroup-inner">
                    <div className="aui-navgroup-primary">
                        <ul className="aui-nav">
                            <li><a href="#" onClick={() => this.props.onCreateNewClick(DUMMY_TEXT)}>Create new test todo
                                item</a>
                            </li>
                            <li className="separate-content"><a href="#">All</a></li>
                            <li><a href="#"> Finished</a></li>
                            <li><a href="#">Not finished</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateNewClick: (text) => dispatch(Actions.addTodo(text)),
    };
};

export default connect(null, mapDispatchToProps)(NavControlBar)