import React, { useState } from "react";
import styles from "./styles.scss";
import Step from "..";
import Terminal from "./terminal";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

function TerminalStep(props) {
  const [actionRunning, setActionRunning] = useState(false);

  function handleActionButton() {
    setActionRunning(true);
  }

  return (
    <Step
      {...props}
      icon={faTerminal}
      additional_view={<Terminal {...props} />}
      action_running={actionRunning}
      handle_action_button={handleActionButton}
    />
  );
}

export default TerminalStep;
