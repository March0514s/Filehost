import React, { Component } from 'react';

class Filelist extends Component {
    constructor(props) {
        super(props)
    }

    delete = () => {
        this.props.modalActionCB('delete');
    }
    

    render() {
        return (
            <table class="table is-fullwidth is-striped fl-table">
                <thead class="is-fullwidth">
                    <tr>
                        <td><input type="checkbox" style={{ marginRight: "10px" }} /> Description<i class="fa fa-arrow-up" /> </td>
                        <td> Sharing</td>
                        <td> Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> 28th Richmond</td>
                        <td>shared folder</td>

                        <td></td>
                    </tr>
                    <tr class="is-selected">
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Information Systems(1)</td>
                        <td>shared folder </td>
                        <td>
                            <div class="dropdown is-hoverable is-left">
                                <div class="dropdown-trigger">
                                    <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span class="has-text-primary"><i class="fas fa-ellipsis-h" /></span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content has-text-primary">
                                        <a href="#" class="dropdown-item">
                                            <i class="fas fa-link" /> Share
                                    </a>
                                        <a href="#" class="dropdown-item">
                                            <i class="fas fa-download" /> Download
                                    </a>
                                        <a href="#" class="dropdown-item">
                                            <i class="fas fa-copy" /> Copy
                                    </a>
                                        <a href="#" class="dropdown-item">
                                            <i class="fas fa-file-export" /> Move
                                    </a>
                                        <a href="#" class="dropdown-item">
                                            <i class="fas fa-edit" /> Rename
                                    </a>
                                        <a onClick={this.delete} href="#" class="dropdown-item">
                                            <i class="fas fa-trash-alt" /> Delete
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Intranet</td>
                        <td>shared folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Literature</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> School</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Sharing</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> Test</td>
                        <td>shared folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-folder fa-2x " style={{ marginRight: "5px" }} /> TitaniumBackup</td>
                        <td>folder</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-image fa-2x " style={{ marginRight: "5px" }} /> Gangbang Nude .png</td>
                        <td>file</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td ><input type="checkbox" style={{ marginRight: "10px" }} /> <i class="far fa-file fa-2x " style={{ marginRight: "5px" }} /> Secret Passwords.txt</td>
                        <td>file</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Filelist;