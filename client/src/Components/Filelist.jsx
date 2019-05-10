import React, { Component } from 'react';

import File from './File';
import spinner from '../icons/spinner.svg'

class Filelist extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table style={{overflowY:'scroll'}}className="table is-fullwidth is-striped fl-table">
                <thead className="is-fullwidth">
                    <tr>
                        <td><input type="checkbox" 
                                   style={{ marginRight: "10px" }}
                                   checked={this.props.selectedFiles.length ? this.props.selectedFiles.length === this.props.files.length : ""}
                                   onChange={this.props.selectAll} 
                            /> Description<i className="fa fa-arrow-up" /> </td>
                        <td> Sharing</td>
                        <td> Actions</td>
                    </tr>
                </thead>
                <tbody>

                    {this.props.files ? this.props.files.map(e =>
                        <File file={e} key={e._id} 
                                       modalActionCB={this.props.modalActionCB} 
                                       fileSelection={this.props.fileSelection} 
                                       number={this.props.files.indexOf(e)} 
                                       token={this.props.token} 
                                       dir={this.props.dir}
                                       onSelectChange={this.props.onSelectChange}
                                       selectedFiles={this.props.selectedFiles}
                                       transferSource={this.props.transferSource}
                                       dirSource={this.props.dirSource}
                                       curDir={this.props.curDir}
                                       transferClick={this.props.transferClick}
                                       move={this.props.move}
                        />
                        
                    ) :  <tr>
                        <td colSpan="3" className='subtitle has-text-centered' style={{justifyContent: 'center'}}>
                            Loading...
                        </td>
                    </tr>}
                   
                </tbody>
            </table>
        )
    }
}

export default Filelist;
