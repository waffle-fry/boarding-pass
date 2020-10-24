import React from "react";
import styled from "styled-components";
import css from "./button-css";
import { Container } from "./container";

const Button = styled.button`
  ${css}
`;

export default (props) => {
  return (
    <Container>
      <Button primary={props.primary} onClick={props.handleClick}>
        {props.value}
      </Button>
    </Container>
  );
};
