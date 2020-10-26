import React, { useContext, useEffect } from "react";
import styles from "./styles.scss";
import AppContext from "../../contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import url from "../../../configurl";
import Axios from "axios";

function OnboardedScreen() {
  const appContext = useContext(AppContext);
  const backendURL = url.split("/config")[0];

  useEffect(() => {
    appContext.onboarded.forEach((plugin) => {
      Axios.post(backendURL + "/" + plugin);
    });
  });

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
