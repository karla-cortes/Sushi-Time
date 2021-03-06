import React from "react";
import axios from "axios";
import Search from "./Search";
import Map from "./Map";

let token = process.env.REACT_APP_YELP;
let geocodeKey = process.env.REACT_APP_GEOCODE;

let config = {
  headers: {
    Authorization: "Bearer " + token
  }
};

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      location: {
        lat: "",
        long: ""
      },
       sushiLocations: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const location = e.target.elements.location.value;
    const newLocation = location.replace(/ /g, "+");
    Promise.all([
      axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Sushi&location=${newLocation}`,
        config
      ),
      axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${newLocation}&key=${geocodeKey}`
      )
    ])
      .then(([res, response]) => {
        let arr = res.data.businesses;
        let newArr = []
        arr.map(function(item, i) {
          return newArr.push({lat: item.coordinates.latitude, lng: item.coordinates.longitude})
         })
        this.setState({
          items: res.data.businesses,
          location: {
            lat: response.data.results[0].geometry.location.lat,
            long: response.data.results[0].geometry.location.lng
          },
          sushiLocations: newArr
        })
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Search handleSubmit={this.handleSubmit} />
        <ul>
          {this.state.items.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <Map latitude={this.state.location.lat} longitude={this.state.location.long} locations={this.state.sushiLocations}/>
      </div>
    );
  }
}

export default Input;
