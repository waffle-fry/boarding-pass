import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./styles.scss";

function Message(props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>
        <FontAwesomeIcon icon={faExclamation} size="2x" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.text}>{props.text}</div>
      </div>
    </div>
  );
}

export default Message;
