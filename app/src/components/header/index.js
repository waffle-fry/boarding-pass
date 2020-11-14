import React from "react";
import BackButton from "./back-button";
import styles from "./styles.scss";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Stages from "./stages";

const Title = styled.div`
  font-size: 3.25vh;
  text-align: center;
  margin-top: 1vh;
  color: ${(props) => props.theme.main};
`;

function Header(props) {
  return (
    <div className={styles.header}>
      <BackButton />
      <img src={props.logo} className={styles.logo} alt="logo" />
      <Title>{props.title}</Title>
      {props.stages && (
        <Stages currentStage={props.currentStage.title} stages={props.stages} />
      )}
    </div>
  );
}

export default Header;
