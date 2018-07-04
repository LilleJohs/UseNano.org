import React, { Component } from 'react';

class Information extends Component {
  render() {
    return (
      <div className="card text-black text-center">
        <br/>
        <h1 className="nanorevolution">Join the Nano revolution!</h1>
        <br/>
        <br/>
        <div className="card-body">
          <h3 className="nanolist">This website lists all merchants that accept Nano as payment.</h3>
          <br/>
          <h4>{"Don't"} know what Nano is? Visit the <a className = "link" href="https://www.nano.org"> Official Nano Website</a> and the <a className="link" href="https://www.reddit.com/r/nanocurrency"> Nano Subreddit</a> to learn more about the currency!</h4>
          <h4>Are we missing a store? Please fill out the form below.</h4>
          <br/>
          <div className="btn-tooltip">
            <a className="btn btn-info btn-lg" href="https://docs.google.com/forms/d/10Zka3DJ_neNUgU40ofNpTWgwO3ZyPKJlM9WA9IMIgAw">Submit a new merchant</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Information;
