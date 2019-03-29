import React, { Component } from 'react';

import File from './File';
import spinner from '../icons/spinner.svg'

class Filelist extends Component {
    // constructor(props) {
    //     super(props)
    // }

    delete = () => {
        this.props.modalActionCB('delete');
    }

    render() {
        return (
            <table className="table is-fullwidth is-striped fl-table">
                <thead className="is-fullwidth">
                    <tr>
                        <td><input type="checkbox" style={{ marginRight: "10px" }} /> Description<i className="fa fa-arrow-up" /> </td>
                        <td> Sharing</td>
                        <td> Actions</td>
                    </tr>
                </thead>
                <tbody>

                    {this.props.files ? this.props.files.map(e =>
                        <File file={e} key={this.props.files.indexOf(e)} number={this.props.files.indexOf(e)}/>
                        
                    ) :  <tr>
                        <td colspan="3" class='subtitle has-text-centered' style={{justifyContent: 'center'}}>
                            Loading...
                        </td>
                    </tr>}
                   
                </tbody>
            </table>
        )
    }
}

export default Filelist;