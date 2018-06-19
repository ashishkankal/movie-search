import React from "react";
const MovieImage = ({ title, path, onClick }) => {
  return (
    <div
      className="movie-image"
      style={{ marginRight: "20px" }}
      onClick={onClick}
    >
      {path && path !== "N/A" ? (
        <img src={path} alt={title} />
      ) : (
        <div
          className="no-movie-image"
          style={{ width: "300px", height: "400px", backgroundColor: "#ccc" }}
        >
          <img
            height="200"
            src={require("images/movie.png")}
            alt={title || "Poster Not Available"}
          />
        </div>
      )}
    </div>
  );
};

export default MovieImage;
