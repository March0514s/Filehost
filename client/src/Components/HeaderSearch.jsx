import React, { Component } from 'react';

class HeaderSearch extends Component {
    constructor(props){
        super(props);
    }

    getCurPath = () => {
        return [...this.props.prevDirStruct, this.props.dir]
    }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    <div className='is-flex' style={{ flexDirection: "colum" }}>
                        {/* Dropdown menu */}
                        {this.getCurPath().length > 2 && (
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
                                  {this.getCurPath().slice(0, this.getCurPath().length - 2).map(dir => (
                                    <div className="dropdown-content" key={dir._id}>
                                        <span className="dropdown-item dir-element" key={dir._id} onClick={() => this.props.changeDir(dir)}>
                                            <i style={{ marginRight: "2px" }} className="far fa-folder"></i>
                                            {dir.name ? dir.name : 'Filehost'}
                                        </span>
                                    </div>
                                  ))}
                              </div>
                          </div>
                        )}
                        {/* Previous folder navigation */}
                        <div className='title'>
                            <span className={this.props.dir.parent ? 'dir-element' : ''} onClick={this.props.dir.parent ? () => this.props.changeDir(this.getCurPath().find(dir => dir._id === this.props.dir.parent)): ''} style={{marginLeft: '10px'}}>
                                {this.props.dir.parent ? 
                                    this.props.dir.parent === 'root' ? 
                                    'Filehost' : 
                                    this.getCurPath().find(dir => dir._id === this.props.dir.parent).name : //search for parent name previously this.props.dir.parent
                                    'Filehost'}
                            </span>
                            {this.props.dir.name ? 
                            <span style={{ color: '#00d1b2' }}>
                                <i style={{ marginLeft: '8px', marginRight: '5px' }} className="fas fa-caret-right"></i>
                            </span> 
                            : ''}
                            <span>
                            { this.props.dir.name ? `${this.props.dir.name}` : ''}
                            </span>
                        </div>
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
