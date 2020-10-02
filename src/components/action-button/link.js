import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

function ActionLinkButton(props) {
  return (
    <div className={styles.action_button}>
      <Link to={props.to} className={styles.button}>
        {props.value}
      </Link>
    </div>
  );
}

export default ActionLinkButton;
