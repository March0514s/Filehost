import React, { Component } from 'react'

import logo from '../img/logo.jpg'

class Sidebar extends Component {
    // constructor(props) {
    //     super(props)
    // }

    upload = () => {
        this.props.modalActionCB('upload');
    }
    
    newDir = () => {
        this.props.modalActionCB('newDir');
    }

    render() {
        return (
            <div className="column is-2 is-flex" style={{flexDirection: "column", paddingTop: "30px", alignItems: "center" }}>
                <div>
                    <figure>
                        <img className="image is-96x96" alt="filehost logo" src={logo} />
                    </figure>
                </div>
                <div style={{ marginRight: "70px", marginTop: "45px", display: "flex", flexDirection: "column" }}>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start'}} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-file" /> My Files</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-image" /> My Photos</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-share-alt" /> Shared Files</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-link" /> Links</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="far fa-clock" /> Events</button>
                </div>
                <hr />
                <div style={{marginRight: "70px", display: "flex", flexDirection: "column" }}>
                    <button onClick={this.upload} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted" href="#"><i className="fas fa-file-upload" /> New File </button>
                    <button onClick={this.newDir} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted" href="#"><i className="fas fa-folder-plus" /> New Folder </button>
                </div>
                <div className="is-hidden" style={{ display: "flex", flexDirection: "column" }}>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-copy" /> Copy...</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-paste" /> Paste...</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-file-export" /> Move...</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted"  href="#"><i className="fas fa-trash-alt" /> Delete...</button>
                </div>
            </div>
        )
    }
}

export default Sidebar;