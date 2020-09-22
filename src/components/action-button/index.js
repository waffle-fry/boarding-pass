import React from "react";
import "./styles.scss";

function ActionButton(props) {
  return (
    <div className="action-button">
      <input
        type="button"
        className="button"
        value={props.value}
        onClick={props.handleClick}
      />
    </div>
  );
}

export default ActionButton;
