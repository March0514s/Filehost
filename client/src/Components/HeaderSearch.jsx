import React from 'react';

function HeaderSearch() {
    return (
        <div class="columns">
            <div class="column">
                <h1 class="title">Filehost</h1>
            </div>
            <div class="columns column">
                <div class="column is-8 is-offset-4">
                    <input class="input" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    )
}

export default HeaderSearch;
