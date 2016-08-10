import React, {Component} from 'react'

/**
 * Root component
 */
export default class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="aui-navgroup aui-navgroup-horizontal">
                        <div className="aui-navgroup-inner">
                            <div className="aui-navgroup-primary">
                                <ul className="aui-nav">
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}