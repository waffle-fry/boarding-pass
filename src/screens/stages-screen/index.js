import React, { useState, useEffect, useCallback } from "react";
import ActionButton from "../../components/action-button";
import Header from "../../components/header";
import data from "../../data.json";
import styles from "./styles.scss";
import { Link, useParams } from "react-router-dom";
import StepsList from "../../components/steps-list";
import ActionLinkButton from "../../components/action-button/link";
import Message from "../../components/message";

function StagesScreen() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(data);
  });

  if (state == null) {
    return "Loading...";
  }

  let { team, stage } = useParams();
  let teamDetails = state.teams.find((teamDetail) => teamDetail.slug == team);
  let currentStage = teamDetails.stages[stage - 1];
  return (
    <div className={styles.container}>
      <Header
        logo={state.logo}
        title={teamDetails.name}
        subtitle={currentStage.title}
      />
      {"message" in currentStage && <Message {...currentStage.message} />}
      <StepsList steps={currentStage.steps} />
      <ActionLinkButton
        to={`/team/${team}/${parseInt(stage) + 1}`}
        value="Continue"
      />
    </div>
  );
}

export default StagesScreen;
