import React, { useState, useEffect, useCallback } from "react";
import ActionButton from "../../components/action-button";
import Header from "../../components/header";
import data from "../../data.json";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import StepsList from "../../components/steps-list";

function StagesScreen() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(data);
  });

  if (state == null) {
    return "Loading...";
  }

  // let { team, stage } = useParams();
  let team = "quantum-pipes";
  let stage = 1;
  let teamDetails = state.teams.find((teamDetail) => teamDetail.slug == team);
  let currentStage = teamDetails.stages[stage - 1];
  return (
    <div className={styles.container}>
      <Header
        logo={state.logo}
        title={teamDetails.name}
        subtitle={currentStage.title}
      />
      <StepsList steps={currentStage.steps} />
      <Link to={`/team/${team}/${stage}`}>
        <ActionButton value="Continue" />
      </Link>
    </div>
  );
}

export default StagesScreen;
