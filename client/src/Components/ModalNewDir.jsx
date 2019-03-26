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
            <div className="modal is-active">
                <div className="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <div className="box column is-7 is-offset-3">
                            <div style={{ marginBottom: "5px", marginTop: "5px", display: "flex", justifyContent: "center" }}>
                                <span className='is-primary'><i className="far fa-folder fa-4x" /></span>
                            </div>
                            <p className="has-text-centered">Would you like to create a new folder?</p>
                            <div className='field' style={{ marginTop: '15px', justifyContent: 'center', display: 'flex' }}>
                                <div className='control'>
                                    <input className="input has-text-centered" type="text" placeholder="New Folder" />
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between" }}>
                                <button onClick={this.close} className="button ">Cancel</button>
                                <button className="button is-primary" >Create</button>
                            </div>
                        </div>

                    </div>
                </div>
                <button onClick={this.close} className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}
export default ModalNewDir;