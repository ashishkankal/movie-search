import React, { Component } from "react";
import { connect } from "react-redux";
import Rating from "components/Rating";
import RatingWrapper from "components/RatingWrapper";
import MovieImage from "components/MovieImage";
import WatchedMovies from "containers/WatchedMovies";
import { addToWatchedList, markedAsUnwatched } from "network/movieActions";
import { setLikeDislikeMovie } from "reducers/LikedDislikedMovies";
import NotSearched from "components/NotSearched";
import NoResultFound from "components/NoResultFound";

class Movie extends Component {
  state = { watched: false };

  onPosterClick = () => {
    const { Movie, markAsWatched } = this.props;

    markAsWatched([Movie]);
  };

  render() {
    const {
      Movie,
      WatchedMoviesData = [],
      markedAsUnwatched,
      setLikeDislikeMovie,
      LikedDislikedMovies
    } = this.props;
    return (
      <div>
        {Movie.Response === "True" ? (
          <div className="movie-wrapper">
            <MovieImage
              title={Movie.Title}
              path={Movie.Poster}
              onClick={this.onPosterClick}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1>{Movie.Title}</h1>

              <div>
                <div className="release-date">
                  <span className="release-date-icon">
                    <i className="fa fa-calendar" />
                  </span>
                  <span className="release-date-value">{Movie.Released}</span>
                </div>

                <RatingWrapper
                  style={{
                    display: "flex",
                    marginBottom: "20px"
                  }}
                >
                  {parseFloat(Movie.imdbRating) ? (
                    <Rating
                      source="IMDB"
                      icon="imdb"
                      value={Movie.imdbRating}
                    />
                  ) : null}
                  {Movie.rTomato ? (
                    <Rating source="Rotten tomatoes" value={Movie.rTomato} />
                  ) : null}

                  {Movie.isWatched && (
                    <span className="watched-badge">Watched</span>
                  )}
                </RatingWrapper>
              </div>
              <div
                style={{
                  borderTop: "4px solid #cecece",
                  paddingTop: "18px"
                }}
              >
                {Movie.Plot}
              </div>
            </div>
          </div>
        ) : Movie.searched ? (
          <NoResultFound error={Movie.Error} />
        ) : (
          <NotSearched error={Movie.Error} />
        )}
        <WatchedMovies
          data={WatchedMoviesData}
          activeMovie={Movie}
          markedAsUnwatched={markedAsUnwatched}
          setLikeDislikeMovie={setLikeDislikeMovie}
          LikedDislikedMovies={LikedDislikedMovies}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    Movie: state.Movie,
    WatchedMoviesData: state.WatchedMovies,
    LikedDislikedMovies: state.LikedDislikedMovies
  };
};
const actionCreators = {
  markAsWatched: addToWatchedList,
  markedAsUnwatched,
  setLikeDislikeMovie
};
export default connect(mapStateToProps, actionCreators)(Movie);
