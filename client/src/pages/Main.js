import React, { Component } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import Information from "../components/Information";
import Footer from "../components/Footer";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header path='/'/>
        <Information />
        <SearchBar />
        <List />
        <Footer />
      </div>
    );
  }
}
