import React, { Component } from "react";
import MovieImage from "components/WatchedMovieImage";
import { Transition } from "react-spring";

const defaultStyles = {
  overflow: "hidden",
  border: "1px solid",
  color: "white",
  display: "flex",
  marginRight: "20px"
};
export default class WatchedMovies extends Component {
  render() {
    const {
      data = [],
      activeMovie,
      LikedDislikedMovies,
      setLikeDislikeMovie,
      markedAsUnwatched
    } = this.props;
    return (
      <div className="watched-movies">
        <div className="watched-movies-header">
          <div className="watched-movies-title">Watched</div>
          <a onClick={() => alert("should view all")} className="view-all-link">
            View all
          </a>
        </div>
        {data.length > 0 ? (
          <div className="watched-movies-content">
            <Transition
              native
              keys={data.map((item, key) => key)}
              from={{ opacity: 0, width: 0 }}
              enter={{ opacity: 1, width: 150 }}
              leave={{ opacity: 0, width: 0 }}
            >
              {data.map((item, index) => styles => (
                <MovieImage
                  likedDisliked={LikedDislikedMovies[item.Title]}
                  style={{ ...defaultStyles, ...styles }}
                  key={index}
                  title={item.Title}
                  path={item.Poster}
                  released={item.Released}
                  setLikeDislikeMovie={setLikeDislikeMovie}
                  onClick={() => markedAsUnwatched(item, activeMovie)}
                />
              ))}
            </Transition>
          </div>
        ) : (
          <div className="no-movies-section">
            <i className="fa fa-binoculars" />
            You have not watched any movie yet
          </div>
        )}
      </div>
    );
  }
}
