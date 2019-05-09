import React, { Component } from 'react';
import qs from 'qs';

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

            curDir: {
              _id: 'root',
              name: 'Filehost',

              dirEntries: {
                parentPath: [],
                children: null,
              },
            },

            selectedFiles: [],
            transferSource: [],
            dirSource: {_id: 'root'}

        }
    }

    async componentDidMount() {
        await this.loadDir();
    }

    loadDir = async id => {
        const res = await fetch(`/api/dirEntries/${id || this.state.curDir._id}`, {
            method: 'GET',
            headers: { authorization: this.props.token }
        });

        const curDir = await res.json();

        console.log('loadDir / newCurDir:', curDir);
        this.setState({
          curDir,
          selectedFiles: [],
        });

        return curDir;
    };

    modalAction = action => this.setState({ modalAction: action });

    fileSelection = file => this.setState({ selectedFile: file });

    dirUpdate = async status => {
        console.log('dirUpdate', status);
        if (status) {
          await this.loadDir();
        }
    }

    changeDir = async newDir => {
        console.log('changeDir', newDir);
        await this.loadDir(newDir._id);
    }

    onSelectChange = chosenFile => {
        if (!this.state.selectedFiles.includes(chosenFile)) {
            this.setState(prevState => {
                return {
                    selectedFiles: [...prevState.selectedFiles, chosenFile]
                }
            })
        }
        else {
            this.setState(prevState => {
                return {
                    selectedFiles: [...prevState.selectedFiles.filter(file => file !== chosenFile)]
                }
            })
        }
    }

    selectAll = () => {
        this.state.selectedFiles.length !== this.state.files.length ? 
        this.setState({selectedFiles: this.state.files}) :
        this.setState({selectedFiles: []})
    }

    transferClick = () => {
        this.setState({transferSource: this.state.selectedFiles, dirSource: this.state.curDir});
        
        
    }

    move = async () => {
        const res = await fetch(`/api/dirEntries?${qs.stringify({
            _id: {
                $in: this.state.transferSource.map(x => x._id),
            },
        })}`, {
            method: 'PATCH',
            headers: { authorization: this.props.token,
                       'content-type': 'application/json' },
            body: JSON.stringify({
                parent: this.state.curDir._id
            })
        })
        
        this.setState({transferSource: []});
        this.dirUpdate(true)
        return res
        
    }

    render() {
        return (
            <div className="columns" style={{ marginRight: '10px' }}>
                <Sidebar modalActionCB={this.modalAction}
                         selectedFiles={this.state.selectedFiles}
                         files={this.state.curDir.dirEntries.children}
                         transferSource={this.state.transferSource}
                         dirSource={this.state.dirSource}
                         curDir={this.state.curDir}
                         transferClick={this.transferClick}
                         move={this.move}
                         prevDirStruct={this.state.curDir.dirEntries.parentPath} 
                         dir={this.state.curDir}
                />
                <div className="column">
                    <UserHeader token={this.props.token}
                        updateTokenCB={this.props.updateTokenCB}
                    />
                    <HeaderSearch dir={this.state.curDir}
                        changeDir={this.changeDir}
                        prevDirStruct={this.state.curDir.dirEntries.parentPath}
                    />
                    <div>
                        <Filelist modalActionCB={this.modalAction}
                            fileSelection={this.fileSelection}
                            token={this.props.token}
                            files={this.state.curDir.dirEntries.children}
                            dir={this.changeDir}
                            selectedFiles={this.state.selectedFiles}
                            onSelectChange={this.onSelectChange}
                            selectAll={this.selectAll}
                            transferSource={this.state.transferSource}
                            dirSource={this.state.dirSource}
                            curDir={this.state.curDir}
                            transferClick={this.transferClick}
                            move={this.move} 
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
