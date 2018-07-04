import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import List from './List';
import Header from './Header';
import Information from './Information';
import Footer from './Footer';
import Map from './Map';


export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Header}/>
            <Route exact path="/" component={Information}/>
            <Route exact path="/" component={SearchBar}/>
            <Route exact path="/" component={List}/>
            <Route exact path="/" component={Footer}/>
            <Route path="/map" component={Map}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//export default App;
//first input sets variable to props
//second input sets functions(actions) to props
