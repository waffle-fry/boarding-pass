import React, { useState, useEffect, useContext } from "react";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";
import styles from "./styles.scss";
import data from "../../data.json";
import ActionLinkButton from "../../components/action-button/link";
import AppContext from "../../contexts/AppContext";

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
        <Title text={appContext.welcome_title} />
        <Subtitle text={appContext.welcome_subtitle} />
      </div>
      <div className={styles.content}>
        <ActionLinkButton to="/teams" value="Get Started" />
      </div>
    </div>
  );
}

export default WelcomeScreen;
