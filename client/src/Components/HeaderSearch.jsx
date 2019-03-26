import React from 'react';

function HeaderSearch() {
    return (
        <div className="columns">
            <div className="column">
                <h1 className="title">Filehost</h1>
            </div>
            <div className="columns column">
                <div className="column is-8 is-offset-4">
                    <input className="input" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    )
}

export default HeaderSearch;
