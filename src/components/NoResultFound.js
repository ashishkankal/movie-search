import React from "react";

export default ({ error = "No Result Found" }) => {
  return (
    <div className="noresult-found">
      <i className="fa fa-exclamation-triangle" />
      {error}
    </div>
  );
};
