import React, { Component } from "react";
import "./topbar.css";

class TopBar extends Component {
  render() {
    return (
      <div class="container top">
        <div className="pageheader">
          <img src={require("./img-01.png")} alt="logo"></img>
          <span class="heading">Administrative Portal</span>
        </div>
      </div>
    );
  }
}

export default TopBar;
