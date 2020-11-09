import React from "react";
import styled from "styled-components";
import Stage from "./stage";

const Stages = styled.div`
  display: flex;
  justify-content: center;
`;

export default (props) => {
  return (
    <Stages>
      {props.stages.map((stage, index) => (
        <Stage key={index} stage={stage} index={index} {...props} />
      ))}
    </Stages>
  );
};

export { Stages };
