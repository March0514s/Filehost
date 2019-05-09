import React, { Component } from 'react';
import { doesNotReject } from 'assert';

class HeaderSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            curPath: [...this.props.prevDirStruct, this.props.dir]
        }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.prevDirStruct !== this.props.prevDirStruct) {
          this.setState({curPath: [...this.props.prevDirStruct, this.props.dir]});
      }
    }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    <div className='is-flex' style={{ flexDirection: "colum" }}>
                        {/* Dropdown menu */}
                        {this.state.curPath.length > 1 && (
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
                                  {this.state.curPath.map(dir => (
                                    <div className="dropdown-content" key={dir._id}>
                                        <span className="dropdown-item dir-element" key={dir._id} onClick={() => this.props.changeDir(dir)}>
                                            <i style={{ marginRight: "2px" }} className="far fa-folder"></i>
                                            {dir.name}
                                        </span>
                                    </div>
                                  ))}
                              </div>
                          </div>
                        )}

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
