import React from "react";
import styles from "./styles.scss";
import Step from "./step";

function StepsList(props) {
  return (
    <div className={styles.container}>
      {props.steps.map((step, index) => (
        <Step {...step} number={index + 1} />
      ))}
    </div>
  );
}

export default StepsList;
