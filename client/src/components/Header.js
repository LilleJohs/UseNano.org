import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.returnButton = this.returnButton.bind(this);
  }

  returnButton() {
    if (this.props.location.pathname !== "/map"){
      return (
        <a href="/map" className="nav-link">
          <button type="button" className="btn btn-primary btn-lg">Map</button>
        </a>
      );
    } else {
      return (
        <a href="/" className="nav-link">
          <button type="button" className="btn btn-primary btn-lg">Online</button>
        </a>
      );
    }
  }

  render() {
    return(
      <nav className="nav navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <span className="navbar-item navbar-left">
            <a>
          	 <img alt="" src="usenanologo.png"/>
            </a>
          </span>
          <span className="nav-item navbar-right">
            {this.returnButton()}
          </span>
        </div>
      </nav>
    );
  }
}

export default Header;
