import React from "react";
import styles from "./styles.scss";
import Step from "..";
import Terminal from "./terminal";

function TerminalStep(props) {
  return <Step {...props} additional_view={<Terminal {...props} />} />;
}

export default TerminalStep;
