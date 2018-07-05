import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const baseURL = 'https://paywithrai.com/mapdb';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { stores: [] };

    this.renderAllStores = this.renderAllStores.bind(this);
    this.renderNewStore = this.renderNewStore.bind(this);
  }

  componentDidMount() {
    const url = baseURL;
    axios.get(url).then((res) => {
      this.setState({ stores: res.data });
      console.log(this.state);
    });
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  renderAllStores() {
    console.log("Hei");
    var table = [];
    for (let i = 0; i < this.state.stores.length; i++) {
      console.log(i);
      table.push(this.renderNewStore(this.state.stores[i]));
    }
    return table;
  }

  renderNewStore(store) {
    console.log(store);
    return (
      <div
        lat={store.lat}
        lng={store.lng}
        text={store.name}
      />
    );
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '88.4vh', width: '100%', margin: '-24px 0px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD3INZ5BSFvJLSl-eQONSY7BvvTNJGyTFo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
        {this.renderAllStores()}
      </div>
    );
  }
}

export default Map;
