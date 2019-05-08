import React, { Component } from 'react';
import { doesNotReject } from 'assert';

class HeaderSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            curPath: [...this.props.prevDirStruct, this.props.dir]
        }
    }

    handleClick = () => {
        this.setState({curPath: [...this.props.prevDirStruct, this.props.dir]}, () => this.forceUpdate)
    };

    render() {
        return (
            <div className="columns">
                <div className="column">
                    {
                            <div className='is-flex' style={{ flexDirection: "colum" }}>
                                {/* Dropdown menu */}
                                {/* {this.props.prevDirStruct
                                            .slice(0, this.props.prevDirStruct.findIndex(k => k._id === this.props.dir.parent))
                                            .filter(dir => dir.name).length > 0 ?
                                <div className="dropdown is-hoverable   ">
                                    <div className="dropdown trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span style={{ marginLeft: '2px' }} className="icon">
                                                <i className="fas fa-folder fa-2x" aria-hidden="true" />
                                            </span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true" />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        {this.props.prevDirStruct
                                            .slice(0, this.props.prevDirStruct.findIndex(k => k._id === this.props.dir.parent))
                                            .filter(dir => dir.name)
                                            .map(dir => {
                                                return <div className="dropdown-content" key={dir._id}>
                                                    <span className="dropdown-item dir-element" key={dir._id} onClick={() => this.props.changeDir(dir)}>
                                                        <i style={{ marginRight: "2px" }} className="far fa-folder"></i>
                                                        {dir.name}
                                                    </span>
                                                </div>
                                            })}
                                    </div>
                                </div>
                                 */}

                                {/* Dir Text */}
                                {
                                    <div className="title">
                                        <span className="title">
                                            <button className={'btn'} onClick={this.handleClick} >UPDATE FUCKING STATE</button>
                                            {   
                                                this.props.dir.parent ? 
                                                this.props.dir.parent === 'root' ? 
                                                'Filehost' : 
                                                this.props.dir.parent : //Acess the parent name initially this.props.dir.parent leads to a cryptic ID.
                                                '' 
                                            }
                                            {
                                                this.props.dir.parent ?
                                                `/${this.props.dir.name}` :
                                                `${this.props.dir.name}` 
                                            }
                                        </span>
                                    </div>
                                }
                                {/* <div className="title">
                                    <span className='dir-element' onClick={() => this.props.changeDir(this.props.prevDirStruct.filter(dir => dir._id === this.props.dir.parent)[0])}>
                                        {!this.props.prevDirStruct.filter(dir => dir._id === this.props.dir.parent)[0].name ?
                                            'Filehost' :
                                            this.props.prevDirStruct.filter(dir => dir._id === this.props.dir.parent)[0].name
                                        }
                                    </span>
                                    <span style={{ color: '#00d1b2' }}>
                                        <i style={{ marginLeft: '8px', marginRight: '5px' }} className="fas fa-caret-right"></i>
                                    </span>
                                    {this.props.dir.name}
                                </div> */}
                            </div>

                    }
                </div>
                <div className="columns column">
                    <div className="column is-8 is-offset-4">
                        <input className="input" type="text" placeholder="Search" />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderSearch;
