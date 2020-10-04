import React, { useState, useEffect, useCallback, useContext } from "react";
import ActionButton from "../../components/action-button";
import Header from "../../components/header";
import data from "../../data.json";
import { exec, spawn } from "child_process";
import styles from "./styles.scss";
import TeamsList from "../../components/teams-list";
import AppContext from "../../contexts/AppContext";

function TeamsScreen() {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Header logo={appContext.logo} title="Choose your team" />
      <TeamsList teams={appContext.teams} />
    </div>
  );
}

export default TeamsScreen;
