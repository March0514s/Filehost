import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import Login from './Containers/Login';
import Home from './Containers/Home';
import ModalUpload from './Components/ModalUpload';
import ModalDelete from './Components/ModalDelete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isUploadingFile: false,
        isRemovingFile: false,
        token: null
        }
  }

  updateToken = token => this.setState({token})

  render() {
    return (
      <div class="is-paddingless">
        <BrowserRouter >
          <div>
          <Route exact path='/' render={(props) => 
          this.state.token ? <Home {...props} />  : (<Redirect to= '/login'/>)
          } />
          <Route path='/login' render={props => <Login {...props} token={this.state.token} updateTokenCB={this.updateToken}/>}/>
          </div> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
