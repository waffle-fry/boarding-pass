import React from "react";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../secondary-button";

function Step(props) {
  return (
    <div className={styles.outer_container}>
      <div className={styles.step_container}>
        <div className={styles.stage_number}>{props.number}</div>
        <div className={styles.container}>
          <div className={styles.icon_container}>
            <FontAwesomeIcon icon={faTerminal} className={styles.icon} />
          </div>
          <div className={styles.content_container}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.text}>{props.text}</div>
            <div className={styles.terminal}>
              <div className={styles.commands}>
                {props.terminal.commands.map((terminal) => (
                  <div
                    className={styles.command}
                  >{`${terminal.title}: ${terminal.command}`}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.action_button}>
        {props.terminal.action_button.enabled && (
          <SecondaryButton value={props.terminal.action_button.title} />
        )}
      </div>
    </div>
  );
}

export default Step;
