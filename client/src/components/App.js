import React, { Component } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import Header from './Header';
import Information from './Information';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Information/>
        <SearchBar/>
        <List/>
        <Footer/>
      </div>
    );
  }
}

//export default App;
//first input sets variable to props
//second input sets functions(actions) to props
