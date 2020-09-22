import React from "react";
import styles from "./styles.scss";

function Subtitle(props) {
  return <div className={styles.subtitle}>{props.text}</div>;
}

export default Subtitle;
