import React, { Component } from 'react';
class ModalNewDir extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newDirName: null
        }
    }

    close = () => {
        this.props.modalActionCB(null);
    }

    onNameChange = e => {
        this.setState({ newDirName: e.target.textContent });

    };

    onFormSubmit = e => {
        e.preventDefault();
        if (this.state.newDirName) {


            const upload = this.upload(this.state.selectedFile);
            console.log('Upload data:', upload);
            console.log(this.props.token);
        }
    };

    upload = async file => {

        const reqData = new FormData();
        const { selectedFile } = this.state;
        reqData.append('size', file.size);
        reqData.append('hash', file.name);
        reqData.append('file', file);


        const res = await fetch('/api/uploads', {
            method: 'POST',
            headers: { authorization: this.props.token },
            body: reqData
        });

        if (!res.ok) {
            throw new Error(
                `HTTP error: ${res.status} ${res.statusText}`,
            );
        }

        this.props.modalActionCB(null); //Replace by status bar and success notice.
        return await res.json();


    }

    render() {
        return (
            <div class="modal is-active">
                <div class="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div class="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <div class="box column is-7 is-offset-3">
                            <div style={{ marginBottom: "5px", marginTop: "5px", display: "flex", justifyContent: "center" }}>
                                <span class='is-primary'><i class="far fa-folder fa-4x" /></span>
                            </div>
                            <p class="has-text-centered">Would you like to create a new folder?</p>
                            <div class='field' style={{ marginTop: '15px', justifyContent: 'center', display: 'flex' }}>
                                <div class='control'>
                                    <input class="input has-text-centered" type="text" placeholder="New Folder" />
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between" }}>
                                <button onClick={this.close} class="button ">Cancel</button>
                                <button class="button is-primary" >Create</button>
                            </div>
                        </div>

                    </div>
                </div>
                <button onClick={this.close} class="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}
export default ModalNewDir;