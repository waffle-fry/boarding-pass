import React from "react";
import styles from "./styles.scss";

function SecondaryButton(props) {
  return (
    <div className={styles.secondary_button}>
      <input
        type="button"
        className={styles.button}
        value={props.value}
        onClick={props.handleClick}
      />
    </div>
  );
}

export default SecondaryButton;
