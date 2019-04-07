import React, { Component } from 'react';

class HeaderSearch extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <div className="columns">
                <div className="column">
                    {this.props.dir !== 'root'  ? 
                    
                    <h1 className="title"><span className='dir-element'onClick={() => this.props.changeDir('root')}>Filehost</span>/{this.props.dir}</h1>
                    :
                    <h1 className="title">Filehost</h1>}
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
