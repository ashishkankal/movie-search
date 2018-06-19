import React from "react";
const Searchbox = props => (
  <div className="search-box">
    <input
      type="text"
      onChange={e => props.onChange({ value: e.target.value })}
      placeholder="Search Movies"
      onKeyPress={({ key }) =>
        key === "Enter" ? props.onSearchClick() : () => {}
      }
    />
    <button onClick={props.onSearchClick} className="search-box-button">
      <i className="fa fa-search" />
    </button>
  </div>
);
export default Searchbox;
