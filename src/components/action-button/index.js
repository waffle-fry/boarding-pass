import React from "react";
import styles from "./styles.scss";

function ActionButton(props) {
  return (
    <div className={styles.action_button}>
      <input
        type="button"
        className={styles.button}
        value={props.value}
        onClick={props.handleClick}
      />
    </div>
  );
}

export default ActionButton;
