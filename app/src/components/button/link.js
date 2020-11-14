import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import css from "./button-css";
import { Container } from "./container";

const Button = styled.div`
  ${css}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default (props) => {
  return (
    <Container>
      <StyledLink to={props.to}>
        <Button primary={props.primary}>{props.value}</Button>
      </StyledLink>
    </Container>
  );
};

export { StyledLink as LinkButton };
