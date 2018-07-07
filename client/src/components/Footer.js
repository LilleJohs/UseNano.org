import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer bg-light font-small">
        <div className="checkOut text-center">
          <h3> Want to accept NANO on your own website but {"don't"} know how? Check out</h3>
          <h2 className="checkOutLinks"><a className="link" href="https://brainblocks.io/">brainblocks</a> and <a className="link" href="https://nanocashier.com/">NanoCashier</a></h2>
        </div>
        <div className="footer py-1 text-center">
          <p>Contact us on spendnano@gmail.com</p>

          <p>Copyright © Use Nano 2018</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
