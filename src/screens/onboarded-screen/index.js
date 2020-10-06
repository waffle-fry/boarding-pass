import React, { useContext } from "react";
import styles from "./styles.scss";
import AppContext from "../../contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

function OnboardedScreen() {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          className={styles.logo}
          size="4x"
        />
        <div className={styles.title}>YOU'RE ALL SET</div>
      </div>
      <div className={styles.content}>
        You're officially onboarded - and now your journey at{" "}
        {appContext.company_name} can really begin!
      </div>
    </div>
  );
}

export default OnboardedScreen;
