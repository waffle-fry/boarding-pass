import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import Step from "..";
import Terminal from "./terminal";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { exec, spawn } from "child_process";

function TerminalStep(props) {
  const [actionRunning, setActionRunning] = useState(false);
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    let commands = [];

    props.terminal.commands.forEach(({ title, command }) => {
      commands.push({
        title: title,
        command: command,
        running: false,
        success: false,
        error: false,
      });
    });

    setCommands(commands);
  }, []);

  function setCommand(index, action, value) {
    let newCommands = commands;
    if (action != "running") {
      newCommands[index].running = false;

      if (index + 1 == commands.length) {
        setActionRunning(false);
      }

      // TO-DO
      // FIX HACK: (setting commands to an empty array forces a re-render in Terminal component)
      setCommands([]);
    }

    newCommands[index][action] = value;
    setCommands(newCommands);
  }

  function handleActionButton() {
    setActionRunning(true);

    commands.forEach(({ command }, index) => {
      setCommand(index, "running", true);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          setCommand(index, "error", true);
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          setCommand(index, "error", true);
          console.log(`stderr: ${stderr}`);
          return;
        }

        setCommand(index, "success", true);
        console.log(`stdout: ${stdout}`);
      });
    });
  }

  return (
    <Step
      {...props}
      icon={faTerminal}
      additional_view={<Terminal commands={commands} />}
      action_running={actionRunning}
      handle_action_button={handleActionButton}
    />
  );
}

export default TerminalStep;
