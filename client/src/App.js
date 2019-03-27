import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import Login from './Containers/Login';
import Explorer from './Containers/Explorer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    }
  }
  
  updateToken = token => this.setState({ token });

  render() {
    return (
      <div className="is-paddingless">
        <BrowserRouter >
          <div className="is-paddingless">
            <Route exact path='/' render={(props) =>
              this.state.token ? <Explorer {...props}
                token={this.state.token}
                updateTokenCB={this.updateToken}
            />
                :
                <Redirect to='/login' />
            } />
            <Route path='/login' render={props => <Login {...props} token={this.state.token} updateTokenCB={this.updateToken} />} />
          </div>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
