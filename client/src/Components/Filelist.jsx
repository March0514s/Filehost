import React, { Component } from 'react';

import File from './File';


class Filelist extends Component {
    constructor(props) {
        super(props)
    }

    delete = () => {
        this.props.modalActionCB('delete');
    }

    render() {
        return (
            <table className="table is-fullwidth is-striped fl-table">
                <thead className="is-fullwidth">
                    <tr>
                        <td><input type="checkbox" style={{ marginRight: "10px" }} /> Description<i className="fa fa-arrow-up" /> </td>
                        <td> Sharing</td>
                        <td> Actions</td>
                    </tr>
                </thead>
                <tbody>

                    {this.props.files ? this.props.files.map(e =>
                        <File file={e} key={this.props.files.indexOf(e)} number={this.props.files.indexOf(e)}/>
                        
                    ) : <tr ><td style={{justifyContent: 'center'}} colSpan='9999' className='subtitle is-flex'>Loading...</td></tr>}
                    {/* <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x" style={{ marginRight: "5px" }} />{this.props.files}</td>
                        <td>shared folder</td>

                        <td></td>
                    </tr>
                    <tr className="is-selected">
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Information Systems(1)</td>
                        <td>shared folder </td>
                        <td>
                            <div className="dropdown is-hoverable is-left">
                                <div className="dropdown-trigger">
                                    <button className="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span className="has-text-primary"><i className="fas fa-ellipsis-h" /></span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content has-text-primary">
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-link" /> Share
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-download" /> Download
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-copy" /> Copy
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-file-export" /> Move
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-edit" /> Rename
                                    </button>
                                        <button onClick={this.delete} href="#" className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-trash-alt" /> Delete
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Intranet</td>
                        <td>shared folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Literature</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> School</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Sharing</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Test</td>
                        <td>shared folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> TitaniumBackup</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-image fa-2x " style={{ marginRight: "5px" }} /> Gangbang Nude .png</td>
                        <td>file</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i className="far fa-file fa-2x " style={{ marginRight: "5px" }} /> Secret Passwords.txt</td>
                        <td>file</td>
                        <td></td>
                    </tr> */}
                </tbody>
            </table>
        )
    }
}

export default Filelist;