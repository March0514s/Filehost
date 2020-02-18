import React, { Component } from 'react'

import logo from '../img/logo.jpg'

class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    upload = () => {
        this.props.modalActionCB('upload');
    }

    newDir = () => {
        this.props.modalActionCB('newDir');
    }

    isValidMove(entry) {
        if (entry.type === 'dir') {
            return ![...this.props.curDir.dirEntries.parentPath, this.props.curDir].find(x => x._id === entry._id)
        }
        else {
            return true
        }
        
    }
    
    validFilter = () => {
        const valid = this.props.transferSource.every(x => this.isValidMove(x))

        return valid

    }


    multiPaste(entries){
        entries.map(x => this.props.paste(this.props.entryToRequest(x)))
    }

    render() {
        return (
            <div className="column is-2 is-flex" style={{ flexDirection: "column", paddingTop: "30px", alignItems: "center" }}>
                <div>
                    <figure>
                        <img className="image is-96x96" alt="filehost logo" src={logo} />
                    </figure>
                </div>
                <div style={{ marginRight: "70px", marginTop: "45px", display: "flex", flexDirection: "column" }}>
                    <button onClick={() => this.props.changeDir({_id: 'root'})} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted deactivated" href="#"><i className="fas fa-file" /> My Files</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted deactivated" href="#"><i className="fas fa-image" /> My Photos</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted deactivated" href="#"><i className="fas fa-share-alt" /> Shared Files</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted deactivated" href="#"><i className="fas fa-link" /> Links</button>
                    <button style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted deactivated" href="#"><i className="far fa-clock" /> Events</button>
                </div>
                <hr />
                <div style={{ marginRight: "70px", display: "flex", flexDirection: "column" }}>
                    <button onClick={this.upload} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted" href="#"><i className="fas fa-file-upload" /> New File </button>
                    <button onClick={this.newDir} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted" href="#"><i className="fas fa-folder-plus" /> New Folder </button>

                    {/* Transfer */}

                    <div className={this.props.files ? this.props.selectedFiles.length > 0 && this.props.selectedFiles.length === this.props.files.length || this.props.selectedFiles.length > 1 ? "" : "is-hidden" : ''} style={{ display: "flex", flexDirection: "column" }}>
                        <hr />
                        <button onClick={this.props.transferClick} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted" href="#"><i className="fas fa-file-export" />Transfer</button>
                        <button onClick={() => this.props.modalActionCB('delete')} style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} className="button is-white is-primary is-inverted" href="#"><i className="fas fa-trash-alt" /> Delete...</button>
                    </div>
                    <div className={this.props.transferSource.length > 0 ? "" : "is-hidden"} style={{ display: "flex", flexDirection: "column" }}>
                        <hr />
                        <button 
                            style={{ paddingBottom: "10px", justifyContent: 'flex-start' }} 
                            className="button is-white is-primary is-inverted" 
                            onClick={() => this.props.curDir.dirEntries.children.filter(x => this.props.transferSource.find(y => x.name === y.name)).length > 0 ? this.props.modalActionCB('duplPaste') : this.multiPaste(this.props.transferSource)}><i className="fas fa-paste" />
                            Paste
                        </button>
                    </div>
                    <div className={this.props.transferSource.length > 0 && this.props.curDir._id !== this.props.dirSource._id ? "" : "is-hidden"} style={{ display: "flex", flexDirection: "column" }}>
                        <button
                            style={{ paddingBottom: "10px", justifyContent: 'flex-start' }}
                            className={this.validFilter() ? "button is-white is-primary is-inverted" : "is-hidden"}
                            onClick={() => this.props.curDir.dirEntries.children.filter(x => this.props.transferSource.find(y => x.name === y.name)).length > 0 ? this.props.modalActionCB('duplMove') : this.props.move()}>
                            <i className="fas fa-file-import" />
                            Move
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Sidebar;