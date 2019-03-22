import React, { Component } from 'react';

class ModalUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
        }
    }

    close = () => {
        this.props.modalActionCB(null);
    }

    onFileChange = e => {
        this.setState({ selectedFile: e.target.files[0] });

    };

    onFormSubmit = async e => {
        e.preventDefault();
        if (this.state.selectedFile) {


            const upload = this.upload(this.state.selectedFile);
            console.log('Upload data:', await upload);
            const resData = await upload;
            
            
            const fileEntry = this.createFile({
                parent: 'root',
                type: 'file',
                name: resData.hash,
                uploadId: resData._id,
                acessPolicy: 'auth',
            });

            console.log('File entry:', await fileEntry)
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

        console.log(res)

        if (!res.ok) {
            throw new Error(
                `HTTP error: ${res.status} ${res.statusText}`,
            );
        }

        // this.props.modalActionCB(null); //Replace by status bar and success notice.
        return await res.json();
        
    }

    createFile = async fileData => {
        const res = await fetch('/api/dirEntries', {
            method: 'POST',
            headers: { authorization: this.props.token }, 
            body: fileData
        });

        if (!res.ok){
            throw new Error(
                `HTTP error: ${res.status} ${res.statusText}`,
            );
        }

        return await res.json();
    }


    render() {
        return (
            <div class="modal is-active">
                <div class="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div class="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <form onSubmit={this.onFormSubmit}>
                            <div class="box column is-8 is-offset-2">
                                <h1 class="title has-text-centered" style={{ color: "#018e79" }}>File Upload</h1>
                                <p class="is-3">Click Browse, to select a File, and then click Upload</p>
                                <p class="is-3" >You can upload multiple files.</p>
                                <hr />
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                    <div>File 1.ext <a><i class="far fa-times-circle" /></a></div>
                                    <div>File 2.ext <a><i class="far fa-times-circle" /></a></div>
                                    <div>File 3.ext <a><i class="far fa-times-circle" /></a></div>
                                </div>
                                <div class="file has-name is-fullwidth" style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="resume" multiple onChange={this.onFileChange} />
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label is-primary">
                                                Browse...
                                    </span>
                                        </span>
                                        <span class="file-name">
                                            Drop file(s) here
                                </span>
                                    </label>

                                </div>
                                <div style={{ marginTop: "15px" }}>
                                    <button class="button is-primary is-fullwidth">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button onClick={this.close} class="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}

export default ModalUpload;