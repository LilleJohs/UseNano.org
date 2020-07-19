import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

import Header from "../components/Header";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const useStyles = (theme) => ({
  card: {
    width: "10%",
    zIndex: 2,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

class MapContainer extends Component {
  constructor(props) {
    super(props);
    const height = window.innerHeight - 65;
    this.state = {
      stores: [],
      height: height,
    };
  }

  renderInformation(store) {
    console.log("rendering");
    console.log(store);
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://gfx.nrk.no/9FvBsqRQ_CJ52et5U8RV9A8meOzDg8ULDklDI0OvTiCw.jpg"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {store.name}
          </Typography>
          <Typography>{store.category}</Typography>
          <Typography>{store.dateAdded}</Typography>
        </CardContent>
        <CardActions>
          <Button href={store.website} size="large" color="primary">
            Go To Website
          </Button>
        </CardActions>
      </Card>
    );
  }

  updateDimensions() {
    const height = window.innerHeight - 65;
    this.setState({ height: height });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    let baseURL;
    if (process.env.NODE_ENV === "production") {
      baseURL = "https://usenano.org/mapdb";
    } else {
      baseURL = "http://localhost:5000/mapdb";
    }

    window.addEventListener("resize", this.updateDimensions.bind(this));

    axios.get(baseURL).then((res) => {
      this.setState({ stores: res.data });
    });
  }

  renderOne(store, i) {
    const StyledPop = styled(Popup)`
      .leaflet-popup-content {
        margin: 0px 0px;
      }
      .leaflet-popup-content-wrapper {
        background: transparent;
        box-shadow: none;
      }

      .a.leaflet-popup-close-button {
        color: #4a90e2;
      }
    `;
    //<StyledPop>{this.renderInformation(store)}</StyledPop>
    return (
      <Marker
        onClick={() => this.setState({ activeMarker: store })}
        key={i}
        position={{ lat: store.lat, lng: store.long }}
      ></Marker>
    );
  }

  renderAll() {
    let table = [];
    let { stores } = this.state;
    for (let i = 0; i < stores.length; i++) {
      table.push(this.renderOne(stores[i], i));
    }
    return table;
  }

  render() {
    const position = { lat: 25, lng: 0 };
    return (
      <div>
        <Header path="/map" />

        <Map
          ref={(m) => {
            this.leafletMap = m;
          }}
          center={position}
          zoom={2}
          style={{ height: this.state.height }}
        >
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiamlpa3V5IiwiYSI6ImNqazE3amtlYzBhbWQzd2xleHNicWp3bXgifQ.yzR_F6OSDRflAc52jhi3Nw"
            maxZoom="18"
          />

          {this.renderAll()}
          {this.state.activeMarker &&
            this.renderInformation(this.state.activeMarker)}
        </Map>
      </div>
    );
  }
}

export default withStyles(useStyles)(MapContainer);
