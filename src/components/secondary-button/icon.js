import React from "react";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SecondaryIconButton(props) {
  return (
    <div className={styles.secondary_button}>
      <div className={styles.button} onClick={props.handleClick}>
        <FontAwesomeIcon icon={props.icon} spin={props.spin} />
      </div>
    </div>
  );
}

export default SecondaryIconButton;
