import React, { Component } from 'react';
import Input from './components/Input';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class App extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyBGSDclHghewEGK4EYVJooH8vFxWtM93bY')
})(App)
