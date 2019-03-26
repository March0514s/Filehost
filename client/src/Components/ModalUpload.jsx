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
                accessPolicy: 'auth',
            });

            console.log('File entry:', await fileEntry)
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

        console.log(res)

        if (!res.ok) {
            throw new Error(
                `HTTP error: ${res.status} ${res.statusText}`,
            );
        }

        this.props.modalActionCB(null); //Replace by status bar and success notice.
        return await res.json();
        
    }

    createFile = async fileData => {
        const res = await fetch('/api/dirEntries', {
            method: 'POST',
            headers: { authorization: this.props.token,
                       'content-type': 'application/json' }, 
            body: JSON.stringify(fileData)
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
            <div className="modal is-active">
                <div className="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="box column is-8 is-offset-2">
                                <h1 className="title has-text-centered" style={{ color: "#018e79" }}>File Upload</h1>
                                <p className="is-3">Click Browse, to select a File, and then click Upload</p>
                                <p className="is-3" >You can upload multiple files.</p>
                                <hr />
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                    <div>File 1.ext <div className='button is-white is-small is-primary is-inverted'><i className="far fa-times-circle" /></div></div>
                                    <div>File 2.ext <div className='button is-white is-small is-primary is-inverted'><i className="far fa-times-circle" /></div></div>
                                    <div>File 3.ext <div className='button is-white is-small is-primary is-inverted'><i className="far fa-times-circle" /></div></div>
                                </div>
                                <div className="file has-name is-fullwidth" style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="resume" multiple onChange={this.onFileChange} />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label is-primary">
                                                Browse...
                                    </span>
                                        </span>
                                        <span className="file-name">
                                            Drop file(s) here
                                </span>
                                    </label>

                                </div>
                                <div style={{ marginTop: "15px" }}>
                                    <button className="button is-primary is-fullwidth">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button onClick={this.close} className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}

export default ModalUpload;