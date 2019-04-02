import React, { Component } from 'react';

class ModalRename extends Component {
    constructor(props) {
        super(props)

        this.newName = null;

    }

    close = () => {
        this.props.modalActionCB(null);
    }

    rename = async () => {
        const res = await fetch(`/api/dirEntries/${this.props.selectedFile._id}`, {
            method: 'PATCH',
            headers: { authorization: this.props.token,
                       'content-type': 'application/json' },
            body: JSON.stringify({
                name: this.newName.value
            })
        })

        return res
    }

    handleSubmit = e => {
        e.preventDefault();
        this.rename();
        this.props.dirUpdate(true);
        this.close();

    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <div className="box column is-7 is-offset-3">
                            <div style={{ marginBottom: "5px", marginTop: "5px", display: "flex", justifyContent: "center" }}>
                                <span className='is-primary'><i className="far fa-file fa-4x" /></span>
                            </div>
                            <p className="has-text-centered">Would you like to rename this file?</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className='field' style={{ marginTop: '15px', justifyContent: 'center', display: 'flex' }}>
                                    <div className='control'>
                                        <input className="input has-text-centered" type="text" name='newName' ref={ref => this.newName = ref} placeholder={this.props.selectedFile.name} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <button onClick={this.close} className="button ">Cancel</button>
                                    <button className="button is-primary" >Rename</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <button onClick={this.close} className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }

}

export default ModalRename;