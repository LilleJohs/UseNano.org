import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(8, 0, 6),
  },
  disclaimer: {
    margin: theme.spacing(3),
  },
  mistakes: {
    margin: theme.spacing(2),
  },
  footer: {
    margin: theme.spacing(4),
  },
}));

export default (props) => {
  const showAll = props.showAll;
  const classes = useStyles();

  let addAll = [];
  if (showAll) {
    addAll.push(
      <Container>
        <Typography variant="h3" align="center">
          Want to accept NANO on your own website but {"don't"} know how? Check
          out{" "}
          <Link
            rel="noopener"
            target="_blank"
            href="https://brainblocks.io/"
            variant="h3"
          >
            brainblocks
          </Link>
        </Typography>

        <Typography className={classes.disclaimer} variant="h4" align="center">
          Disclaimer: This site does not endorse nor confirm the legitimacy of
          the stores listed. We try our best to make sure the information is
          correct and up to date, but there may be errors or inconsistencies.
        </Typography>

        <Typography className={classes.mistakes} variant="h5" align="center">
          See any mistakes or outdated information? Make a pull request on{" "}
          <Link
            rel="noopener"
            target="_blank"
            href="https://github.com/LilleJohs/UseNano.org"
            variant="h5"
          >
            Github
          </Link>
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      {addAll}
      <Typography
        className={classes.footer}
        variant="h5"
        color="textSecondary"
        align="center"
      >
        Copyright © UseNano 2020
      </Typography>
    </Container>
  );
  /*<footer className="page-footer bg-light font-small">
        <div className="checkOut text-center">
          <h3> Want to accept NANO on your own website but {"don't"} know how? Check out</h3>
          <h2 className="checkOutLinks">
            <a target="_blank" rel="noopener noreferrer" className="link" href="https://brainblocks.io/">
              brainblocks
            </a>, <a target="_blank" rel="noopener noreferrer" className="link" href="https://nanocashier.com/">
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
      </footer>*/
};
