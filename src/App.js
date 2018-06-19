import React, { Component } from "react";
import Searchbox from "containers/SearchContainer";
import "./styles.css";

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app">
        <div className="app-header">
          MOVIE SEARCH <Searchbox />
        </div>
        <div className="app-body">{children}</div>
      </div>
    );
  }
}

export default App;
