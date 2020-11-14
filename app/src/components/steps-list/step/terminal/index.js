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

    commands.forEach(({ command, success, error }, index) => {
      new Promise((resolve, reject) => {
        if (!success) {
          setCommand(index, "running", true);
          exec(command, (error, stdout, stderr) => {
            if (error) {
              reject(error.message);
              return;
            }
            if (stderr) {
              reject(stderr);
              return;
            }

            resolve(stdout);
          });
        } else {
          resolve("Already run");
        }
      })
        .then((stdout) => {
          console.log(`stdout: ${stdout}`);
          setCommand(index, "success", true);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
          setCommand(index, "error", true);
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
