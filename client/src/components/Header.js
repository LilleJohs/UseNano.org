import React, { Component, Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
  constructor(props) {
    super(props);
    this.returnButton = this.returnButton.bind(this);
  }

  returnButton() {
    if (this.props.path !== "/map"){
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
      <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            UseNano.org
          </Typography>
        </Toolbar>
      </AppBar>
      </Fragment>
      /*<nav className="nav navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <span className="navbar-item navbar-left">
            <a href="/">
          	 <img alt="" src="usenanologo.png"/>
            </a>
          </span>
          <span className="nav-item navbar-right">
            {this.returnButton()}
          </span>
        </div>
      </nav>*/
    );
  }
}

export default Header;
