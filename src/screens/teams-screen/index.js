import React, { useState, useEffect, useCallback } from "react";
import ActionButton from "../../components/action-button";
import Header from "../../components/header";
import data from "../../data.json";
import { exec, spawn } from "child_process";
import styles from "./styles.scss";
import TeamsList from "../../components/teams-list";

function TeamsScreen() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(data);
  });

  if (state == null) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Header logo={state.logo} title="Choose your team" />
      <TeamsList teams={data.teams} />
    </div>
  );
}

export default TeamsScreen;
