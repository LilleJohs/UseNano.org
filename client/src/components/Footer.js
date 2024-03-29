import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer bg-light font-small">
        <div className="checkOut text-center">
          <h4 style={{margin: '30px 0px 30px 0px'}}>
            Disclaimer: This site does not endorse nor confirm the legitimacy of the stores listed. We try our best to make
            sure the information is correct and up to date, but there may be errors or inconsistencies.
          </h4>
        </div>
        <div className="footer py-1 text-center">
          <p>See any mistakes or outdated information? Make a pull request on <a href="https://github.com/LilleJohs/UseNano.org">Github</a></p>

          <p>Copyright © Use Nano 2020</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
