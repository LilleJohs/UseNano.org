import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

import Header from '../components/Header';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    const height = window.innerHeight - 65;
    this.state = {
      stores: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      height: height,
    };
  }

  updateDimensions() {
    const height = window.innerHeight - 65;
    this.setState({ height: height });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidMount() {
    let baseURL;
    if (process.env.NODE_ENV === 'production') {
      baseURL = 'https://usenano.org/mapdb';
    } else {
      baseURL = 'http://localhost:5000/mapdb';
    }

    window.addEventListener('resize', this.updateDimensions.bind(this));

    axios.get(baseURL).then((res) => {
      this.setState({ stores: res.data });
    });
  }

  renderOne(store, i) {
    return (
      <Marker key={i} position={{ lat: store.lat, lng: store.lng }}>
        <Popup style={{ margin: '0' }}>
          <h3>{store.name}</h3>
          <h4>{store.category}</h4>
          <h4>
            <a href={store.website}>{store.website}</a>
          </h4>
          <h4>{store.discount}</h4>
        </Popup>
      </Marker>
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
        <Header path='/map'/>
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
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiamlpa3V5IiwiYSI6ImNqazE3amtlYzBhbWQzd2xleHNicWp3bXgifQ.yzR_F6OSDRflAc52jhi3Nw'
            maxZoom='18'
          />
          {this.renderAll()}
        </Map>
      </div>
    );
  }
}
