import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer bg-light font-small">
        <div className="checkOut text-center">
          <h3> Want to accept NANO on your own website but {"don't"} know how? Check out</h3>
          <h2 className="checkOutLinks">
            <a target="_blank" rel="noopener noreferrer" className="link" href="https://brainblocks.io/">
              brainblocks
            </a> , <a target="_blank" rel="noopener noreferrer" className="link" href="https://nanocashier.com/">
              NanoCashier
            </a> and <a target="_blank" rel="noopener noreferrer" className="link" href="https://kitepay.io/">
              KitePay
            </a>
          </h2>
          <h4 style={{margin: '30px 0px 30px 0px'}}>
            Disclaimer: This site does not endorse nor confirm the legitimacy of the stores listed. We try our best to make
            sure the information is correct and up to date, but there may be errors or inconsistencies.
          </h4>
        </div>
        <div className="footer py-1 text-center">
          <p>Contact us on <a href="mailto:spendnano@gmail.com">spendnano@gmail.com</a>. See any mistakes or outdated information? Send me an e-mail or make a pull request on <a href="https://github.com/LilleJohs/UseNano.org">Github</a></p>

          <p>Copyright © Use Nano 2018</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
