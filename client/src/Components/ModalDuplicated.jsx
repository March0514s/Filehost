import React, { Component } from 'react';

class ModalDuplicated extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
        }
    }

    close = () => {
        this.props.modalActionCB(null);
    }


    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="modal-content" syle={{ display: "flex", justifyContent: "center" }}>
                        <div className="box column is-7 is-offset-3">
                            <div style={{ marginBottom: "15px", marginTop: "5px", display: "flex", justifyContent: "center" }}>
                                <span className="has-text-danger"><i className="fas fa-exclamation-triangle fa-4x" /></span>
                            </div>
                            <hr />
                            <p className="has-text-center">One or more files you're trying to transfer have the same name of existing files in the current directory, how that should be solved?</p>
                            <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
                                <button onClick={this.props.curAction === 'duplMove' ? () => {this.props.overwrite();  this.props.move(); this.close()} : () => {this.props.overwrite();  this.props.paste(); this.close()}}className="button">Overwrite</button>
                                <button onClick={this.props.curAction === 'duplMove' ? () => {this.props.rename('move'); this.close()} : () => {this.props.rename('paste'); this.close()}} className="button">Rename</button>
                                <button onClick={this.props.curAction === 'duplMove' ? () => {this.props.ignore('move'); this.close()} : () => {this.props.ignore('paste'); this.close()}} className="button">Ignore</button>
                                <button onClick={this.close} className="button">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={this.close} className="modal-close is-large" aria-label="close"></button>
            </div>

        )
    }
}

export default ModalDuplicated;