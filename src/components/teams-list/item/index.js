import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Name = styled.div`
  color: ${(props) => props.theme.main};
  font-size: 2.5vh;
`;

function TeamsListItem(props) {
  return (
    <div className={styles.container}>
      {"stages" in props ? (
        <Link to={`team/${props.slug}/1`} className={styles.link}>
          <div className={styles.card}>
            <Name>{props.name}</Name>
          </div>
        </Link>
      ) : (
        <div
          onClick={() => alert("This team's config is incomplete")}
          className={styles.link}
        >
          <div className={styles.card}>
            <Name>{props.name}</Name>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamsListItem;
