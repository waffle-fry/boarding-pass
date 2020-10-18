import React, { useState, useEffect, useCallback, useContext } from "react";
import Header from "../../components/header";
import data from "../../data.json";
import styles from "./styles.scss";
import { Link, useParams } from "react-router-dom";
import StepsList from "../../components/steps-list";
import Message from "../../components/message";
import AppContext from "../../contexts/AppContext";
import LinkButton from "../../components/button/link";

function StagesScreen() {
  const appContext = useContext(AppContext);

  let { team, stage } = useParams();
  let teamDetails = appContext.teams.find(
    (teamDetail) => teamDetail.slug == team
  );
  let currentStage = teamDetails.stages[stage - 1];
  return (
    <div className={styles.container}>
      <Header
        logo={appContext.logo}
        title={teamDetails.name}
        subtitle={currentStage.title}
      />
      {"message" in currentStage && <Message {...currentStage.message} />}
      <StepsList steps={currentStage.steps} />
      {stage != teamDetails.stages.length ? (
        <LinkButton
          primary
          to={`/team/${team}/${parseInt(stage) + 1}`}
          value="Continue"
        />
      ) : (
        <LinkButton primary to="/onboarded" value="Continue" />
      )}
    </div>
  );
}

export default StagesScreen;
