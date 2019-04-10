import React, { Component } from 'react';

class HeaderSearch extends Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    {
                        !this.props.dir ?
                            <h1 className="title">
                                Filehost
                            </h1>
                            :

                            <div className='is-flex' style={{ flexDirection: "colum" }}>
                                    <div className="dropdown is-hoverable   ">
                                     <div class="dropdown trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span style={{ marginLeft: '2px' }} className="icon">
                                                <i className="fas fa-folder fa-2x" aria-hidden="true" />
                                            </span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true" />
                                            </span>
                                        </button>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                        {this.props.prevDirStruct.map(dir => {return <div class="dropdown-content">
                                            <span class="dropdown-item dir-element" onClick={() => this.props.changeDir(dir[0])}>
                                                <i style={{marginRight: "2px"}}className="far fa-folder"></i>
                                                {dir[1]}
                                            </span>
                    </div>})}
                                    </div>
                                </div>
                                <div className="title">
                                    <span className='dir-element' onClick={() => this.props.changeDir('root')}>
                                        Filehost
                                    </span>
                                    /{this.props.dir}
                                </div>
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
