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
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-file" /> My Files</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-image" /> My Photos</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-share-alt" /> Shared Files</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-link" /> Links</a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="far fa-clock" /> Events</a>
            </div>
            <hr />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-file-upload" /> New File </a>
                <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-folder-plus" /> New Folder </a>
            </div>
                <div class="is-hidden" style={{ display: "flex", flexDirection: "column" }}>
                    <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-copy" /> Copy...</a>
                    <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-paste" /> Paste...</a>
                    <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-file-export" /> Move...</a>
                    <a style={{ paddingBottom: "10px" }} href="#"><i class="fas fa-trash-alt" /> Delete...</a>
                </div>
            </div>
            )
        }
        
export default Sidebar;