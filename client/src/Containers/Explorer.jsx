import React, { Component } from 'react';

import Sidebar from '../Components/Sidebar';
import UserHeader from '../Components/UserHeader';
import HeaderSearch from '../Components/HeaderSearch';
import Filelist from '../Components/Filelist';
import ModalUpload from '../Components/ModalUpload';
import ModalDelete from '../Components/ModalDelete';
import ModalNewDir from '../Components/ModalNewDir';
import ModalRename from '../Components/ModalRename';

class Explorer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalAction: null,
            files: null,
            selectedFile: null,
            curDirID: 'root',
            curDirName: '',
            prevDirSruct: [[0, 'root'], [1, 'hiragana-table'], [2, 'New Folder']],
            
        }
    }

    async componentDidMount(){
        this.setState({files: await this.loadList()});
    }

    loadList = async () => {
        const res = await fetch(`/api/dirEntries?parent=${this.state.curDirID}`, {
            method: 'GET',
            headers: { authorization: this.props.token }
        })
        this.state.dirChanges = false;
        return await res.json();
    };

    modalAction = action => this.setState({ modalAction: action });
    
    fileSelection = file => this.setState({ selectedFile: file });
    
    dirUpdate = async status => {
        if (status) this.setState({files: await this.loadList()});
    }

    changeDir = (id, name) => {
        // this.setState({prevDirStruct: this.state.prevDirStruct.concat([...id, name])});
        this.setState({curDirID: id, curDirName: name}, () => this.dirUpdate(true));
    }
    
    render() {
        return (
            <div className="columns" style={{ marginRight: '10px' }}>
                <Sidebar modalActionCB={this.modalAction} />
                <div className="column">
                    <UserHeader token={this.props.token}
                                updateTokenCB={this.props.updateTokenCB}
                                 />
                    <HeaderSearch dir={this.state.curDirName}
                                  changeDir={this.changeDir}
                                  prevDirStruct={this.state.prevDirStruct} //Quando pega do state dá erro, porque dá erro? 
                                  />
                    <div>
                        <Filelist modalActionCB={this.modalAction} 
                                  fileSelection={this.fileSelection} 
                                  token={this.props.token} 
                                  files={this.state.files}
                                  dir={this.changeDir}
                                  dirUpdate={this.dirUpdate}
                                  />
                    </div>
                </div>
                {this.state.modalAction === 'upload' ? <ModalUpload modalActionCB={this.modalAction} 
                                                                    token={this.props.token} 
                                                                    dirUpdate={this.dirUpdate} 
                                                        /> : ''}
                {this.state.modalAction === 'newDir' ? <ModalNewDir modalActionCB={this.modalAction} 
                                                                    token={this.props.token} 
                                                                    dirUpdate={this.dirUpdate}
                                                                    dir={this.state.curDirID} 
                                                        /> : ''}
                {this.state.modalAction === 'delete' ? <ModalDelete modalActionCB={this.modalAction} 
                                                                    token={this.props.token} 
                                                                    dirUpdate={this.dirUpdate}
                                                                    selectedFile={this.state.selectedFile} 
                                                        /> : ''}
                {this.state.modalAction === 'rename' ? <ModalRename modalActionCB={this.modalAction} 
                                                                    token={this.props.token} 
                                                                    dirUpdate={this.dirUpdate}
                                                                    selectedFile={this.state.selectedFile} 
                                                        /> : ''}
            </div>
        )
    }
}

export default Explorer;