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
            curDir: {name:'Filehost', _id: 'root'},
            prevDirStruct: [],
            
        }
    }

    async componentDidMount(){
        this.setState({files: await this.loadList()});
    }

    loadList = async () => {
        const res = await fetch(`/api/dirEntries?parent=${this.state.curDir._id}`, {
            method: 'GET',
            headers: { authorization: this.props.token }
        })
        this.setState({dirChanges : false});
        return await res.json();
    };

    modalAction = action => this.setState({ modalAction: action });
    
    fileSelection = file => this.setState({ selectedFile: file });
    
    dirUpdate = async status => {
        if (status) this.setState({files: await this.loadList()});
    }

    changeDir = (folder) => {
        this.setState((prevState) => {
            return {
                prevDirStruct: [...prevState.prevDirStruct, this.state.curDir]
            }

            
        })
        
        this.setState({curDir: folder}, () => this.dirUpdate(true));
    }
    
    render() {
        return (
            <div className="columns" style={{ marginRight: '10px' }}>
                <Sidebar modalActionCB={this.modalAction} />
                <div className="column">
                    <UserHeader token={this.props.token}
                                updateTokenCB={this.props.updateTokenCB}
                                 />
                    <HeaderSearch dir={this.state.curDir}
                                  changeDir={this.changeDir}
                                  prevDirStruct={this.state.prevDirStruct} 
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
                                                                    dir={this.state.curDir} 
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