import React from "react";
import styles from "./styles.scss";
import Step from "./step";
import TerminalStep from "./step/terminal";

function StepsList(props) {
  return (
    <div className={styles.container}>
      {props.steps.map((step, index) => (
        <TerminalStep {...step} key={`step-${index}`} number={index + 1} />
      ))}
    </div>
  );
}

export default StepsList;
