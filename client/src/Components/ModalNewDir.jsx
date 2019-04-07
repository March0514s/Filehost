import React, { Component } from 'react';
class ModalNewDir extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 'New Folder'
        }
    }

    close = () => {
        this.props.modalActionCB(null);
    }
    
    handleSubmit = e => {
        e.preventDefault();
       this.createFolder(this.state.value);
        this.close();

    };

    handleChange = e => {
        this.setState({value: e.target.value});

    };

    createFolder = async folder => {
        const res = await fetch('/api/dirEntries', {
            method: 'POST',
            headers:{
                authorization: this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                parent: this.props.dir,
                type: 'dir',
                name: folder,
                accessPolicy: 'auth'
            })
        });

        if (!res.ok){
            throw new Error(
                `HTTP Error ${res.status} ${res.statusText}`
            )
        }
        else{
            this.props.dirUpdate(true);
        }
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
                            <form onSubmit={this.handleSubmit}>
                                <div className='field' style={{ marginTop: '15px', justifyContent: 'center', display: 'flex' }}>
                                    <div className='control'>
                                        <input className="input has-text-centered" type="text" value={this.state.value} onChange={this.handleChange}  placeholder={`${this.state.value}`} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <button onClick={this.close} className="button ">Cancel</button>
                                    <button className="button is-primary" >Create</button>
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
export default ModalNewDir;