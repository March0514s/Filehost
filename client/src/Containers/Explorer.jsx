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
import ModalDuplicated from '../Components/ModalDuplicated';

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
            dirSource: { _id: 'root' }

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

        this.setState({
            curDir,
            selectedFiles: [],
        });

        return curDir;
    };

    modalAction = action => this.setState({ modalAction: action });

    fileSelection = file => this.setState({ selectedFile: file });

    dirUpdate = async status => {
        if (status) {
            await this.loadDir();
        }
    }

    changeDir = async newDir => {
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
            this.setState({ selectedFiles: this.state.files }) :
            this.setState({ selectedFiles: [] })
    }

    transferClick = () => {
        this.setState({ transferSource: this.state.selectedFiles, dirSource: this.state.curDir });


    }

    move = async () => {
        const res = await fetch(`/api/dirEntries?${qs.stringify({
            _id: {
                $in: this.state.transferSource.map(x => x._id),
            },
        })}`, {
                method: 'PATCH',
                headers: {
                    authorization: this.props.token,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    parent: this.state.curDir._id
                })
            })

        this.setState({ transferSource: [] });
        this.dirUpdate(true)
        return res

    }

    paste = async requestData => {
        const res = await fetch('/api/dirEntries', {
            method: 'POST',
            headers: {
                authorization: this.props.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!res.ok) {
            throw new Error(
                `HTTP error: ${res.status} ${res.statusText}`,
            );
        }
        else {
            this.dirUpdate(true);
        }

        return await res.json();


    }

    delete = async requestData => {
        console.log(`removing file at /api/dirEntries/${requestData._id}`);
        const res = await fetch(`/api/dirEntries/${requestData._id}`, {
            method: 'DELETE',
            headers: { authorization: this.props.token }
        });

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status} ${res.statusText}`)
        }
        else {
            this.dirUpdate(true);
        }


    }

    duplCheck(newName) {
        const occurrences = this.state.curDir.dirEntries.children.filter(x => x.name.split(/[(|.)]/)[0] === newName.split(/[(|.)]/)[0]).length;
        let trailingNumber = occurrences > 0 ? occurrences : null;
        let outputName = null;

        this.state.curDir.dirEntries.children.filter(x => x.name === newName).length > 0 && occurrences ?

            this.state.curDir.dirEntries.children.find(x => x.name === `${newName.split(/[(|.]/)[0]}(${trailingNumber}).${newName.split('.')[1]}`) ?

                outputName = `${newName.split(/[(|.]/)[0]}(${++trailingNumber}).${newName.split('.')[1]}`

                :

                outputName = `${newName.split(/[(|.]/)[0]}(${trailingNumber}).${newName.split('.')[1]}`

            :

            outputName = newName;

        return outputName
    }

    //Prevent multiple files with the same name in the same directory
    overwrite = () => {
        const confItems = this.state.curDir.dirEntries.children.filter(x => this.state.transferSource.find(y => x.name === y.name))
        confItems.map(x => this.delete(x))
    }

    rename = action => {
        //Should use prevstate transferSource?
       const renamedSource = this.state.transferSource.map(x => {
           x.name = this.duplCheck(x.name);
           return x
        });
       action === 'move' ? this.setState({transferSource: renamedSource}, () => {console.log(this.state.transferSource); this.move()}) : this.setState({transferSource: renamedSource}, () => this.paste())
        
        //this.setState(prevState => {
        //    transferSource: prevState.transferSource.map(x => this.duplCheck(x.name))
        //})
    }

    ignore = action => {
        //As an asynchronous method, this.move is being called before the state is updated
        const cleanClipboard = this.state.transferSource.filter(x => !this.state.curDir.dirEntries.children.find(y => x.name === y.name))
        
        action === 'move' ? this.setState({transferSource: cleanClipboard}, () => this.move()) : this.setState({transferSource: cleanClipboard}, () => this.paste())
        

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
                    changeDir={this.changeDir}
                    paste={this.paste}
                    modalActionCB={this.modalAction}
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
                    curDir={this.state.curDir}
                    duplCheck={this.duplCheck}
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
                    selectedFiles={this.state.selectedFiles}
                    delete={this.delete}
                /> : ''}
                {this.state.modalAction === 'rename' ? <ModalRename modalActionCB={this.modalAction}
                    token={this.props.token}
                    dirUpdate={this.dirUpdate}
                    selectedFile={this.state.selectedFile}
                    curDir={this.state.curDir}
                    duplCheck={this.duplCheck}

                /> : ''}
                {this.state.modalAction === ('duplMove' || 'duplPaste') ? <ModalDuplicated modalActionCB={this.modalAction}
                    token={this.props.token}
                    dirUpdate={this.dirUpdate}
                    selectedFile={this.state.selectedFile}
                    curDir={this.state.curDir}
                    duplCheck={this.duplCheck}
                    transferSource={this.state.transferSource}
                    overwrite={this.overwrite}
                    rename={this.rename}
                    ignore={this.ignore}
                    curAction={this.state.modalAction}
                    move={this.move}
                    paste={this.paste}

                /> : ''}


            </div>
        )
    }
}

export default Explorer;
