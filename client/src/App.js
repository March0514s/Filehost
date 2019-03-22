import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import Login from './Containers/Login';
import Home from './Containers/Home';
import ModalUpload from './Components/ModalUpload';
import ModalDelete from './Components/ModalDelete';
import ModalNewDir from './Components/ModalNewDir';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalAction: null,
        token: null,
        }
  }

  modalAction = action => this.setState({modalAction : action});
  updateToken = token => this.setState({token});
  

  render() {
    return (
      <div class="is-paddingless">
        <BrowserRouter >
          <div>
          <Route exact path='/' render={(props) => 
          this.state.token ? <Home {...props} 
                                   token={this.state.token} 
                                   modalActionCB={this.modalAction} 
                                   updateTokenCB={this.updateToken}/>  : 
                              <Redirect to= '/login'/>
          } />
          <Route path='/login' render={props => <Login {...props} token={this.state.token} updateTokenCB={this.updateToken}/>}/>
          </div> 
        </BrowserRouter>
        {/* Modal */}
        {this.state.modalAction === 'upload' ? <ModalUpload modalActionCB={this.modalAction} token={this.state.token} /> : ''}
        {this.state.modalAction === 'newDir' ? <ModalNewDir modalActionCB={this.modalAction} token={this.state.token} /> : ''}
        {this.state.modalAction === 'delete' ? <ModalDelete modalActionCB={this.modalAction} /> : ''} 
      }
      </div>
    );
  }
}

export default App;
