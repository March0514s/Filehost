import React, { Component } from 'react';


class ModalDelete extends Component {
    constructor(props){
        super(props)
    }
    
    close = () => {
        this.props.modalActionCB(null);
    }

    render() {
        return (
            <div class="modal is-active">
                <div class="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div class="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <div class="box column is-7 is-offset-3">
                            <div style={{ marginBottom: "15px", marginTop: "5px", display: "flex", justifyContent: "center" }}>
                                <span class="has-text-danger"><i class="fas fa-exclamation-triangle fa-4x" /></span>
                            </div>
                            <p class="has-text-centered">Are you sure you want to delete the selected files? This operation cannot be undone.</p>
                            <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
                                <button class="button ">Cancel</button>
                                <button class="button is-danger">Delete</button>
                            </div>
                        </div>

                    </div>
                </div>
                <button onClick={this.close} class="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}

export default ModalDelete;