import React, { Component } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StoreCards from "../components/StoreCards";
import Information from "../components/Information";
import Footer from "../components/Footer";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header path="/" />
        <Information />
        <SearchBar />
        <StoreCards />
        <Footer />
      </div>
    );
  }
}
