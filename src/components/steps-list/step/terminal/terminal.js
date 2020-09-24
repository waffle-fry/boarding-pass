import React from "react";
import styles from "./styles.scss";

function Terminal(props) {
  return (
    <div className={styles.terminal}>
      <div className={styles.commands}>
        {props.commands.map((command) => (
          <div
            key={`command-${command}`}
            className={styles.command}
          >{`${command.title}: ${command.command}`}</div>
        ))}
      </div>
    </div>
  );
}

export default Terminal;
