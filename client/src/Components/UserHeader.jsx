import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class UserHeader extends Component {
    // constructor(props) {
    //     super(props)

    // }

    handleClick = e => {

        this.props.updateTokenCB(null);

    }

    render() {
        return (
            <div className="column is-offset-11" style={{ display: "flex", justifyContent: "flex-end", whiteSpace: "nowrap" }}>
                <div className="column is-paddingless">
                    <div className="columns column" style={{ paddingRight: 0, paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignSelf: "center", flexWrap: "nowrap" }}>
                        <div className="dropdown is-hoverable is-right">
                            <div className="dropdown-trigger">
                                <button className="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span><i className="far fa-user-circle" /> Marcus Dv</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <button className="button is-white dropdown-item deactivated">
                                        Settings
                            </button>
                                    <Link to='/' onClick={this.handleClick} className="dropdown-item">
                                        Logout
                            </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHeader;