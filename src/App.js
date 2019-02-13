import React, { Component } from 'react';
import './App.css';

import Sidebar from './Components/Sidebar';
import UserHeader from './Components/UserHeader';
import HeaderSearch from './Components/HeaderSearch';
import FilelistHeader from './Components/FilelistHeader';
import Filelist from './Components/Filelist';
import Login from './Components/Login';
import ModalUpload from './Components/ModalUpload';
import ModalDelete from './Components/ModalDelete';

class App extends Component {
  render() {
    return (
      <div>
      {/* Login */}
      {/* <Login/> */}
      {/* Main View */}
      <div>
        <section class="section is-paddingless">
          <div class="container">
            <div class="columns">
              <Sidebar />
              <div class="column">
                <UserHeader />
                <HeaderSearch />
                <div>
                  <FilelistHeader />
                  <Filelist />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Modal view */}
      {/* <ModalUpload/> */}
      <ModalDelete/>
      </div>
    );
  }
}

export default App;
