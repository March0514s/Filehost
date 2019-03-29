import React, { Component } from 'react';

class File extends Component {
    constructor(props) {
        super(props)

        this.state = {
            icons: {

            }
        }
    }

    handleMouseOver = e => {    
        document.getElementById(this.props.number).classList.add('is-selected');
        document.getElementById(this.props.file._id).classList.remove('is-hidden')
    }

    handleMouseLeave = e => {    
        document.getElementById(this.props.number).classList.remove('is-selected');
        document.getElementById(this.props.file._id).classList.add('is-hidden') 
    }

    iconSelect = e => {
        switch(e.type){
            case 'folder':
                return 'far fa-folder fa-2x'
            default:
                switch(e.name.split('.').pop()){
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'gif':
                        return 'far fa-image fa-2x'
                    default:
                        return  'far fa-file fa-2x'
                }
        }
    
    }

    render() {
        return (
                <tr  id={this.props.number} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <td>
                        {/* Description */}
                        <input type="checkbox" style={{ marginRight: "10px" }} /> 
                        <i className={this.iconSelect(this.props.file)} style={{ marginRight: "10px" }} />
                        {this.props.file.name}
                    </td>
                    <td>
                        {/* Sharing */}
                        --
                    </td>
                    <td>
                        {/* Actions */}
                        <div id={this.props.file._id} className="dropdown is-hoverable is-left is-hidden">
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
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-download" /> Download
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-copy" /> Copy
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-file-export" /> Move
                                    </button>
                                        <button className="button dropdown-item is-white is-primary is-inverted">
                                            <i className="fas fa-edit" /> Rename
                                    </button>
                                        <button href="#" className="button dropdown-item is-white is-primary is-inverted">
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