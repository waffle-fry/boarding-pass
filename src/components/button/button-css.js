import { css } from "styled-components";

export default css`
  display: flex;
  flex-direction: column;
  font-size: 2.25vh;
  align-items: center;
  color: ${(props) => props.theme.main};
  background-color: #ffffff;
  border-color: ${(props) => props.theme.main};
  border-width: 0.2vh;
  border-style: solid;
  border-radius: 3vh;
  padding-top: 1vh;
  padding-left: 3vh;
  padding-right: 3vh;
  padding-bottom: 1vh;

  ${(props) =>
    props.primary &&
    css`
      background: ${(props) => props.theme.main};
      color: white;
    `}
`;
