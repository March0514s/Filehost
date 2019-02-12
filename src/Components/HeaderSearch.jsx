import React from 'react';

function HeaderSearch() {
    return (
        <div class="columns">
            <div class="column">
                <h1 class="title">Bropdox</h1>
            </div>
            <div class="columns column">
                <div class="column is-one-third" style={{ display: "flex", justifyContent: "space-around", alignSelf: "center" }}>
                    <i class="fas fa-file-upload" />
                    <i class="fas fa-folder-plus" />
                    <i class="fas fa-share-alt-square" />
                    <i class="fas fa-trash-alt" />
                </div>
                <div class="column">
                    <input class="input" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    )
}

export default HeaderSearch;
