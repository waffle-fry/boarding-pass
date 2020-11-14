import React from "react";
import styles from "./styles.scss";
import TeamsListItem from "./item";
import urlSlug from "url-slug";

function TeamsList(props) {
  return (
    <div className={styles.container}>
      {props.teams.map((team) => (
        <TeamsListItem
          {...team}
          slug={urlSlug(team.name)}
          key={`team-${urlSlug(team.name)}`}
        />
      ))}
    </div>
  );
}

export default TeamsList;
