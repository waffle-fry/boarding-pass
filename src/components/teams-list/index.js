import React from "react";
import styles from "./styles.scss";
import TeamsListItem from "./item";

function TeamsList(props) {
  return (
    <div className={styles.container}>
      {props.teams.map((team) => (
        <TeamsListItem {...team} key={`team-${team.slug}`} />
      ))}
    </div>
  );
}

export default TeamsList;
