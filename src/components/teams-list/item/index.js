import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

function TeamsListItem(props) {
  return (
    <div className={styles.container}>
      <Link to={`team/${props.slug}`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.name}>{props.name}</div>
        </div>
      </Link>
    </div>
  );
}

export default TeamsListItem;
