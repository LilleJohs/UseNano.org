import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { doSort } from "../actions/index";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.secondary.main,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

function renderImage(store) {
  switch (store.name) {
    case null:
      return;
    default:
      const img = store.img;
      if (typeof img === "string") {
        return img;
      }
      let imageLink;
      if (img != null) {
        imageLink = `data:${img.contentType};base64,${arrayBufferToBase64(
          img.data.data
        )}`;
      } else {
        imageLink = "logos/none.png";
      }
      return imageLink;
  }
}

export default (props) => {
  const store = props.store;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={renderImage(store)}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {store.name}
        </Typography>
        <Typography color="">{store.category}</Typography>
        <Typography color="">
          Added
          {store.dateAdded &&
            new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(store.dateAdded))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={store.website} size="large" color="primary">
          Go To Website
        </Button>
      </CardActions>
    </Card>
  );
};
