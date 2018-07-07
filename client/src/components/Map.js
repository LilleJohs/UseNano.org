import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const baseURL = 'https://paywithrai.com/mapdb';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { stores: [] };
  }

  componentDidMount() {
    const url = baseURL;
    axios.get(url).then(res => {
      this.setState({ stores: res.data });
    });
  }

  renderOne(store, i) {
    return (
      <Marker
        title={store.name}
        name={store.category}
        key={i}
        position={{ lat: store.lat, lng: store.lng }}
      />
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
    return (
      <div style={{ margin: '-24px 0px -90px 0px' }}>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: 50,
            lng: 10
          }}
          zoom={5}
        >
          {this.renderAll()}

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Test</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3INZ5BSFvJLSl-eQONSY7BvvTNJGyTFo'
})(MapContainer);
