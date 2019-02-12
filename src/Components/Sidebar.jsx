import React from 'react'

import logo from '../img/logo.jpg'

function Sidebar() {
    return (
        <div class="column is-2" style={{ display: "flex", flexDirection: "column", paddingTop: "30px", display: "flex" }}>
            <div>
                <figure>
                    <img class="image is-96x96" src={logo} />
                </figure>
            </div>
            <div style={{ marginTop: "45px", display: "flex", flexDirection: "column" }}>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-file" /> Files</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-image" /> Photos</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-share-alt" /> Sharing</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-link" /> Links</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="far fa-clock" /> Events</a>
            </div>
        </div>
    )
}

export default Sidebar;