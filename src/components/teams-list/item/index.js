import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

function TeamsListItem(props) {
  return (
    <div className={styles.container}>
      {"stages" in props ? (
        <Link to={`team/${props.slug}/1`} className={styles.link}>
          <div className={styles.card}>
            <div className={styles.name}>{props.name}</div>
          </div>
        </Link>
      ) : (
        <div
          onClick={() => alert("This team's config is incomplete")}
          className={styles.link}
        >
          <div className={styles.card}>
            <div className={styles.name}>{props.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamsListItem;
