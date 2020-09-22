import React from "react";
import styles from "./styles.scss";

function Title(props) {
  return <div className={styles.title}>{props.text}</div>;
}

export default Title;
