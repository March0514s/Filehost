import React from 'react';

import Sidebar from '../Components/Sidebar';
import UserHeader from '../Components/UserHeader';
import HeaderSearch from '../Components/HeaderSearch';
import Filelist from '../Components/Filelist';

function Home() {
    return (
        <div>
            <div class="container">
                <div class="columns">
                    <Sidebar />
                    <div class="column">
                        <UserHeader />
                        <HeaderSearch />
                        <div>
                            <Filelist />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;