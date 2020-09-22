import React from "react";
import "./styles.scss";

function Header(props) {
  return (
    <div className="header">
      <img src={props.logo} className="logo" alt="logo" />
      <div className="title">{props.title}</div>
    </div>
  );
}

export default Header;
