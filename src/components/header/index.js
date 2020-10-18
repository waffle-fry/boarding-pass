import React from "react";
import BackButton from "./back-button";
import styles from "./styles.scss";
import styled from "styled-components";

const Title = styled.div`
  font-size: 4vh;
  text-align: center;
  margin-top: 1vh;
  color: ${(props) => props.theme.main};
`;

const Subtitle = styled.div`
  font-size: 2.25vh;
  text-align: center;
  margin-top: 1vh;
  color: ${(props) => props.theme.secondary};
`;

function Header(props) {
  return (
    <div className={styles.header}>
      <BackButton />
      <img src={props.logo} className={styles.logo} alt="logo" />
      <Title>{props.title}</Title>
      {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
    </div>
  );
}

export default Header;
