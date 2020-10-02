import React, { useState, useEffect } from "react";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";
import styles from "./styles.scss";
import data from "../../data.json";
import ActionLinkButton from "../../components/action-button/link";

function WelcomeScreen(props) {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(data);
  });

  if (state == null) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={state.logo}
          className="Logo"
          alt="logo"
          className={styles.logo}
        />
        <Title text={state.welcome_title} />
        <Subtitle text={state.welcome_subtitle} />
      </div>
      <div className={styles.content}>
        <ActionLinkButton to="/teams" value="Get Started" />
      </div>
    </div>
  );
}

export default WelcomeScreen;
