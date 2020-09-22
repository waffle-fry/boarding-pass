import React from "react";
import "./styles.scss";

function Header(props) {
  return (
    <div className="Header-Container">
      <img src={props.logo} className="Header-Logo" alt="logo" />
      <div className="Header-Title-Text">{props.title}</div>
    </div>
  );
}

export default Header;
