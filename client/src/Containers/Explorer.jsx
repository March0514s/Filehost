import React, { Component } from 'react';

import Sidebar from '../Components/Sidebar';
import UserHeader from '../Components/UserHeader';
import HeaderSearch from '../Components/HeaderSearch';
import Filelist from '../Components/Filelist';
import ModalUpload from '../Components/ModalUpload';
import ModalDelete from '../Components/ModalDelete';
import ModalNewDir from '../Components/ModalNewDir';

class Explorer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalAction: null,
            files: null
        }
    }

    async componentDidMount(){
        this.setState({files: await this.loadList()});
    }

    loadList = async () => {
        const res = await fetch('/api/dirEntries?parent=root', {
            method: 'GET',
            headers: { authorization: this.props.token }
        })
        this.state.dirChanges = false;
        return await res.json();
    };

    modalAction = action => this.setState({ modalAction: action });
    
    dirUpdate = async status => {
        if (status) this.setState({files: await this.loadList()});
    }
    
    render() {
        return (
            <div className="columns" style={{ marginRight: '10px' }}>
                <Sidebar modalActionCB={this.modalAction} />
                <div className="column">
                    <UserHeader token={this.props.token}
                        updateTokenCB={this.props.updateTokenCB} />
                    <HeaderSearch />
                    <div>
                        <Filelist modalActionCB={this.modalActionCB} token={this.props.token} files={this.state.files}/>
                    </div>
                </div>
                {this.state.modalAction === 'upload' ? <ModalUpload modalActionCB={this.modalAction} token={this.props.token} dirUpdate={this.dirUpdate} /> : ''}
                {this.state.modalAction === 'newDir' ? <ModalNewDir modalActionCB={this.modalAction} token={this.props.token} dirUpdate={this.dirUpdate} /> : ''}
                {this.state.modalAction === 'delete' ? <ModalDelete modalActionCB={this.modalAction} token={this.props.token} dirUpdate={this.dirUpdate} /> : ''}
            </div>
        )
    }
}

export default Explorer;