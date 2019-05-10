import React, { Component } from 'react';

class File extends Component {
    constructor(props) {
        super(props)
    }

    iconSelect = e => {
        switch (e.type) {
            case 'dir':
                return 'far fa-folder fa-2x'
            default:
                switch (e.name.split('.').pop()) {
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'gif':
                        return 'far fa-image fa-2x'
                    default:
                        return 'far fa-file fa-2x'
                }
        }

    }

    singleFileSelect = () => {
        this.props.onSelectChange(this.props.file);
    }
    

    singleFileMove = () => {
        this.props.transferClick();
    }

    //Expecting server solution to use an anchor instead. 
    downloadFile = async () => {
        const res = await fetch(`/files/${this.props.file._id}/${this.props.file.name}`, {
            method: 'GET',
            headers: { authorization: this.props.token } 
        });

        if (!res.ok) {
            throw new Error(
                `HTTP Error: ${res.status} ${res.statusText}`
            )
        };

        res.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${this.props.file.name}`;
            a.click();
        });

    }

    deletion = () => {
        this.props.fileSelection(this.props.file);
        this.props.modalActionCB('delete');
    }

    rename = () => {
        this.props.fileSelection(this.props.file);
        this.props.modalActionCB('rename');
    }

    openFolder = () => {
        this.props.dir(this.props.file);
        
    }

    render() {
        return (
            <tr className="explorerFileRow">
                {this.props.file.type === 'dir' ?
                    <td>
                        {/* Description */}
                        <input type="checkbox" 
                               checked={this.props.selectedFiles.includes(this.props.file)} 
                               onChange={() => this.props.onSelectChange(this.props.file)}                               
                               style={{ marginRight: "10px" }} 
                        />
                        <span onClick={this.openFolder} className='dir-element'>
                            <i className={this.iconSelect(this.props.file)} style={{ marginRight: "10px" }} />
                            {this.props.file.name}
                        </span>
                    </td>

                    :

                    <td>
                        {/* Description */}
                        <input type="checkbox" 
                               checked={this.props.selectedFiles.includes(this.props.file)} 
                               onChange={() => this.props.onSelectChange(this.props.file)}                               
                               style={{ marginRight: "10px" }} 
                        />
                        <i className={this.iconSelect(this.props.file)} style={{ marginRight: "10px" }} />
                        {this.props.file.name}
                    </td>}
                <td>
                    {/* Sharing */}
                    --
                    </td>
                <td>
                    {/* Actions */}
                    <div className="dropdown is-hoverable is-left explorerMenu">
                        <div className="dropdown-trigger ">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span className="has-text-primary"><i className="fas fa-ellipsis-h" /></span>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content has-text-primary">
                                <button className="button dropdown-item is-white is-primary is-inverted">
                                    <i className="fas fa-link" /> Share
                                    </button>
                                <button onClick={this.downloadFile} className="button dropdown-item is-white is-primary is-inverted">
                                    <i className="fas fa-download" /> Download
                                    </button>
                                <button className="button dropdown-item is-white is-primary is-inverted">
                                    <i className="fas fa-copy" /> Copy
                                    </button>
                                <button onMouseOver={this.singleFileSelect} onClick={this.singleFileMove} className="button dropdown-item is-white is-primary is-inverted">
                                    <i className="fas fa-file-export" /> Transfer
                                    </button>
                                <button onClick={this.rename} className="button dropdown-item is-white is-primary is-inverted">
                                    <i className="fas fa-edit" /> Rename
                                    </button>
                                <button onClick={this.deletion} href="#" className="button dropdown-item is-white is-primary is-inverted">
                                    <i className="fas fa-trash-alt" /> Delete
                                    </button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default File
