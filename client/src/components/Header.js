import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(4),
  },
  button: {
    padding: theme.spacing(0, 4),
    fontSize: 16,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar color="primary" position="relative">
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h4"
          color="secondary"
          noWrap
        >
          UseNano.org
        </Typography>
        <Button
          className={classes.button}
          size="large"
          href="/"
          color="secondary"
        >
          Online Merchants
        </Button>
        <Button
          className={classes.button}
          size="large"
          href="/map"
          color="secondary"
        >
          Brick-and-mortar
        </Button>

        <Button
          className={classes.button}
          size="large"
          href="/addstore"
          color="secondary"
          variant="outlined"
        >
          + Suggest New Merchant
        </Button>
      </Toolbar>
    </AppBar>
  );
}
