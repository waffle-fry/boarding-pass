import React from "react";
import styles from "./styles.scss";
import Step from "..";
import Terminal from "./terminal";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

function TerminalStep(props) {
  return (
    <Step
      {...props}
      icon={faTerminal}
      additional_view={<Terminal {...props} />}
    />
  );
}

export default TerminalStep;
