import React, { useState, useEffect, useContext } from "react";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";
import styles from "./styles.scss";
import data from "../../data.json";
import AppContext from "../../contexts/AppContext";
import LinkButton from "../../components/button/link";

function WelcomeScreen() {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={appContext.logo}
          className="Logo"
          alt="logo"
          className={styles.logo}
        />
        <Title>{appContext.welcome_title}</Title>
        <Subtitle>{appContext.welcome_subtitle}</Subtitle>
      </div>
      <div className={styles.content}>
        <LinkButton primary to="/teams" value="Get Started" />
      </div>
    </div>
  );
}

export default WelcomeScreen;
