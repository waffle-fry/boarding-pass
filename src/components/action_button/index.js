import React from "react";
import "./styles.css";

function ActionButton(props) {
  return (
    <div className="ActionButtonContainer">
      <input
        type="button"
        className="ActionButton"
        value={props.value}
        onClick={props.handleClick}
      />
    </div>
  );
}

export default ActionButton;
