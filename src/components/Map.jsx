import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


let mapKey = process.env.REACT_APP_GOOGLE;

class Map extends React.Component {

constructor(props) {
   super(props)
   this.state = {
     center: {
       lat: 25.82071592,
       lng: -80.1819268
     },
     zoom : 14,
     myMarkers : []
   };

}
componentWillReceiveProps(nextProps) {
    this.setState({ center: {
      lat: nextProps.latitude,
      lng: nextProps.longitude
    },
      myMarkers: nextProps.locations
    });
  }


  render() {
    return (
      <div style={{ height: '100vh', width: '50%' }}>
      <GoogleMapReact
      bootstrapURLKeys={{ key: mapKey}}
      center={this.state.center}
      defaultZoom={this.state.zoom}
      >

      {this.state.myMarkers.map((item,i) => {
       return (<Marker key={i} lat={item.lat} lng={item.lng}/>)
     })}
    </GoogleMapReact>
    </div>
    );
  }
}

export default Map;
