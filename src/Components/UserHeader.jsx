import React from 'react';

function UserHeader() {
    return (
        <div class="column is-offset-11" style={{ display: "flex", justifyContent: "flex-end", whiteSpace: "nowrap" }}>
            <div class="column is-paddingless">
                <div class="columns column" style={{ paddingRight: 0, paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignSelf: "center", flexWrap: "nowrap" }}>
                    <div class="dropdown is-hoverable is-right">
                        <div class="dropdown-trigger">
                            <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span><i class="far fa-user-circle" /> Samuel Ng</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a href="#" class="dropdown-item">
                                    Settings
                            </a>
                                <a href="#" class="dropdown-item">
                                    Logout
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader;