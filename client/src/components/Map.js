import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  componentDidMount() {
    let baseURL;
    if (process.env.NODE_ENV === 'production') {
      baseURL = 'https://usenano.org/mapdb';
    } else {
      baseURL = 'http://localhost:5000/mapdb';
    }

    axios.get(baseURL).then(res => {
      this.setState({ stores: res.data });
    });
  }

  onMarkerClick = (props, marker, e) =>
     this.setState({
       selectedPlace: props,
       activeMarker: marker,
       showingInfoWindow: true
     });

  renderOne(store, i) {
    return (
      <Marker
        onClick={this.onMarkerClick}
        title={store.name}
        name={store.category}
        website={store.website}
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

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div style={{margin: '-10px 0px 0px 0px'}}>
              <h3>{this.state.selectedPlace.title}</h3>
              <h4>{this.state.selectedPlace.name}</h4>
              <h4><a target="_blank" href={this.state.selectedPlace.website}>{this.state.selectedPlace.website}</a></h4>
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
