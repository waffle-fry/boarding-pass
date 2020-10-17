import React from "react";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondaryButton from "../../secondary-button";
import SecondaryIconButton from "../../secondary-button/icon";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Button from "../../button";
import IconButton from "../../button/icon";

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  background-color: ${(props) => props.theme.main};
  color: #ffffff;
  width: 5vh;
  height: 5vh;
  border-radius: 100%;
  margin-right: 2.5vh;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border-color: ${(props) => props.theme.main};
  border-width: 0.1vh;
  border-style: solid;
  min-height: 8vh;
`;

const IconContainer = styled.div`
  background-color: ${(props) => props.theme.main};
  padding: 3.5vh;
  align-items: center;
  display: flex;
`;

const Title = styled.div`
  font-size: 2.25vh;
  font-weight: bold;
  color: ${(props) => props.theme.main};
  margin-bottom: 0.25vh;
`;

function Step(props) {
  return (
    <div className={styles.outer_container}>
      <div className={styles.step_container}>
        <StepNumber>{props.number}</StepNumber>
        <Container>
          <IconContainer>
            <FontAwesomeIcon icon={props.icon} className={styles.icon} />
          </IconContainer>
          <div className={styles.content_container}>
            <Title>{props.title}</Title>
            <div className={styles.text}>{props.text}</div>
            {props.additional_view}
          </div>
        </Container>
      </div>
      <div className={styles.action_button}>
        {"action_button" in props &&
          props.action_button.enabled &&
          (!props.action_running ? (
            <Button
              value={props.action_button.title}
              handleClick={props.handle_action_button}
            />
          ) : (
            <IconButton
              icon={faSpinner}
              spin={true}
              handleClick={props.handle_action_button}
            />
          ))}
      </div>
    </div>
  );
}

export default Step;
