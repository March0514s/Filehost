import React, { Component } from 'react';

import Sidebar from '../Components/Sidebar';
import UserHeader from '../Components/UserHeader';
import HeaderSearch from '../Components/HeaderSearch';
import Filelist from '../Components/Filelist';

class Home extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <div>
                <div class="container">
                    <div class="columns">
                        <Sidebar modalActionCB={this.props.modalActionCB} />
                        <div class="column">
                            <UserHeader token={this.props.token} 
                                        updateTokenCB={this.props.updateTokenCB} />
                            <HeaderSearch />
                            <div>
                                <Filelist modalActionCB={this.props.modalActionCB}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;