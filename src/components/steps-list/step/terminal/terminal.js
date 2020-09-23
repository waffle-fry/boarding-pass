import React from "react";
import styles from "./styles.scss";

function Terminal(props) {
  return (
    <div className={styles.terminal}>
      <div className={styles.commands}>
        {props.terminal.commands.map((command) => (
          <div
            className={styles.command}
          >{`${command.title}: ${command.command}`}</div>
        ))}
      </div>
    </div>
  );
}

export default Terminal;