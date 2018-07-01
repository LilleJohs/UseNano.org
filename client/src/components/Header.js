import React, { Component } from 'react';

class Header extends Component {
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
            <a href="/map" className="nav-link">
        	    <button type="button" className="btn btn-primary btn-lg">Map</button>
        	  </a>
          </span>
        </div>
      </nav>
    );
  }
}

export default Header;
