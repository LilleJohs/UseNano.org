import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(8, 0, 6),
  },
}));

export default function Information() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="secondary"
          gutterBottom
        >
          Merchants Directory
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Check out this Merchant List to find out where to buy goods with Nano
        </Typography>
      </Container>
    </div>

    /*<div className="card text-black text-center">
      <div className="nanorevolution">
        <h1>Join the Nano Revolution!</h1>
      </div>
      <div className="card-body">
        <h3 className="nanolist">
          This website lists all known merchants that accept Nano as payment.
        </h3>
        <div className="whatisnano">
          <h4>
            Nano is a feeless and extremely fast cryptocurrency. Check out the
            speed yourself{" "}
            <a
              href="http://nanospeed.live"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nanospeed-live btn-nanospeed-live-lg"
            >
              Speed Test Nano{" "}
              <span role="img" aria-label="Timer">
                &#9200;
              </span>
            </a>
          </h4>
          <h4>
            Want to learn more about Nano? Visit the{" "}
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nano.org"
            >
              Official Nano Website
            </a>{" "}
            and the{" "}
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/nanocurrency"
            >
              Nano Subreddit
            </a>{" "}
            to learn more about the currency!
          </h4>
          <h4>Are we missing a store? Please fill out the form below.</h4>
        </div>
        <div className="btn-tooltip">
          <a className="btn btn-info btn-lg" href="/addstore">
            Submit a new merchant
          </a>
        </div>
      </div>
    </div>*/
  );
}
