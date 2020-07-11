import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OnlineStore from './pages/OnlineStore';
import ApproveStore from './pages/ApproveStore';
import AddStore from './pages/AddStore';
import MapContainer from './pages/Map';
import Main from './pages/Main';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Main} />
            <Route path='/map' component={MapContainer} />
            <Route path='/online' component={OnlineStore} />
            <Route path='/addstore' component={AddStore} />
            <Route path='/approveStore' component={ApproveStore} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//export default App;
//first input sets variable to props
//second input sets functions(actions) to props
