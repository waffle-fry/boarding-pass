import React from "react";
import BackButton from "./back-button";
import styles from "./styles.scss";

function Header(props) {
  return (
    <div className={styles.header}>
      <BackButton />
      <img src={props.logo} className={styles.logo} alt="logo" />
      <div className={styles.title}>{props.title}</div>
      {props.subtitle && (
        <div className={styles.subtitle}>{props.subtitle}</div>
      )}
    </div>
  );
}

export default Header;
