import React, { Component } from 'react';

class Information extends Component {
  render() {
    return (
      <div class="card text-black text-center">
        <br/>
        <h1>Join the Nano revolution!</h1>
        <br/>
        <br/>
        <div class="card-body">
          <h1>This website lists all merchants that accept Nano as payment.</h1>
          <br/>
          <h4>{"Don't"} know what Nano is? Visit the <a class = "link" href="https://www.nano.org"> Official Nano Website</a> and the <a class="link" href="https://www.reddit.com/r/nanocurrency"> Nano Subreddit</a> to learn more about the currency!</h4>
          <h4>Are we missing a store? Please fill out the form below.</h4>
          <br/>
          <div class="btn-tooltip">
            <button type="button" class="btn btn-lg"><a href="https://docs.google.com/forms/d/10Zka3DJ_neNUgU40ofNpTWgwO3ZyPKJlM9WA9IMIgAw" class="text-white">Fill out this form</a></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Information;
