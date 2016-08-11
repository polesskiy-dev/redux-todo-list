import React, {Component} from 'react'
import './NavControlBar.less'

/**
 * Navigation var with control buttons
 */
export default class NavControlBar extends Component {
    render() {
        return (
            <nav className="aui-navgroup aui-navgroup-horizontal">
                <div className="aui-navgroup-inner">
                    <div className="aui-navgroup-primary">
                        <ul className="aui-nav">
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}