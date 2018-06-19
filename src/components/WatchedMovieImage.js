import React, { Component } from "react";
import classNames from "classnames/bind";
import { animated } from "react-spring";
export default class WatchedMovieImage extends Component {
  state = { showDetails: false };

  render() {
    const {
      title,
      path,
      released,
      onClick,
      style,
      likedDisliked,
      setLikeDislikeMovie
    } = this.props;

    return (
      <animated.div
        style={style}
        className="watched-movie-image"
        onMouseOver={() => this.setState({ showDetails: true })}
        onMouseOut={() => this.setState({ showDetails: false })}
        onClick={onClick}
      >
        {path && path !== "N/A" ? (
          <img src={path} alt={title} height="200" width="150" />
        ) : (
          <div
            style={{
              height: "200px",
              width: "150px",
              backgroundColor: "#999",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <img src={require("images/movie.png")} alt="mov" height="50" />
            {title}
          </div>
        )}
        <div
          className="watched-movie-image-info"
          style={{ position: "absolute", color: "#fff", padding: "5px" }}
        >
          <div className="watched-movie-title">{title}</div>
          <div className="watched-movie-date">{released}</div>
          <div className="like-dislike">
            <div
              className={classNames(
                "thumb",
                likedDisliked === "liked" && "__selected"
              )}
              onClick={e => {
                e.stopPropagation();
                setLikeDislikeMovie({ [title]: "liked" });
              }}
            >
              <i
                style={{ fontSize: "20px" }}
                className={classNames(
                  "fa",
                  likedDisliked === "liked"
                    ? " fa-thumbs-up"
                    : " fa-thumbs-o-up"
                )}
              />
            </div>{" "}
            <div
              className={classNames(
                "thumb",
                likedDisliked === "disliked" && "__selected"
              )}
              onClick={e => {
                e.stopPropagation();
                setLikeDislikeMovie({ [title]: "disliked" });
              }}
            >
              <i
                style={{ fontSize: "20px" }}
                className={classNames(
                  "fa",
                  likedDisliked === "disliked"
                    ? " fa-thumbs-down"
                    : " fa-thumbs-o-down"
                )}
              />
            </div>
          </div>
        </div>
      </animated.div>
    );
  }
}
