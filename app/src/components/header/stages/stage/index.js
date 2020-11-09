import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75vh;
  text-align: center;
  margin-top: 1vh;
  color: ${(props) => (props.current ? props.theme.secondary : "#000000")};
  font-style: ${(props) => (props.current ? "" : "italic")};
  font-weight: ${(props) => (props.current ? "" : "lighter")};
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Spacer = styled.div`
  width: 5vh;
  height: 0.1vh;
  background-color: #000000;
  margin-left: 1vh;
  margin-right: 1vh;
`;

export default (props) => {
  let { team } = useParams();

  return (
    <Container current={props.stage === props.currentStage ? true : false}>
      <StyledLink to={`/team/${team}/${props.index + 1}`}>
        {props.stage}
      </StyledLink>
      {props.stages.length != props.index + 1 && <Spacer />}
    </Container>
  );
};

export { Container as StageContainer, Spacer as StageSpacer };
