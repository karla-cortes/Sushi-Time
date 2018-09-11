import React from "react";
import axios from "axios";
import Search from "./Search";

let token = process.env.REACT_APP_YELP.slice(0, -1);
let geocodeKey = process.env.REACT_APP_GEOCODE.slice(0, -1);

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
      }
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
      .then(([res, response]) =>
        this.setState({
          items: res.data.businesses,
          location: {
            lat: response.data.results[0].geometry.location.lat,
            long: response.data.results[0].geometry.location.lng
          }
        })
      )
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
        <p>User Lat: {this.state.location.lat}</p>
        <p>User Long: {this.state.location.long}</p>
      </div>
    );
  }
}

export default Input;
