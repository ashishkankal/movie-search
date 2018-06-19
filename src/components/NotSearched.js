import React from "react";

export default ({ error = "Search a movie to see results" }) => {
  return (
    <div className="not-searched-section">
      <i className="fa fa-search" />
      {error}
    </div>
  );
};
