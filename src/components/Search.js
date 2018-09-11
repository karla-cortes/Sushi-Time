import React from 'react';


class Search extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input type="search" name="location" placeholder="Enter your ZipCode or City" />
        <button className="find-sushi">Let&#39;s Eat!</button>
      </form>
    )
  }
}

export default Search;
