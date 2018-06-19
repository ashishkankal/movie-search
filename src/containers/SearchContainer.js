import Searchbar from "components/Searchbar";
import React, { Component } from "react";
import { fetchAndSetMovieDetails } from "network/movieActions";
import { connect } from "react-redux";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = e => {
    const value = e.value;
    this.setState({ value });
  };

  onSearchClick = () =>
    this.props.getMovie(
      this.state.value,
      this.props.WatchedMoviesData,
      () => {}
    );

  render() {
    return (
      <Searchbar
        value={this.state.value}
        onChange={this.onChange}
        onSearchClick={this.onSearchClick}
      />
    );
  }
}
const mapStateToProps = state => {
  return { Movie: state.Movie, WatchedMoviesData: state.WatchedMovies };
};

const actionCreators = {
  getMovie: fetchAndSetMovieDetails
};
export default connect(mapStateToProps, actionCreators)(SearchContainer);
