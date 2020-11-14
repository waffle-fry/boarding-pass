import { faCopy, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./styles.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Terminal(props) {
  return (
    <div className={styles.terminal}>
      <div className={styles.commands}>
        {props.commands.map(
          ({ title, command, running, success, error }, index) => (
            <div
              key={`command-${index}`}
              className={
                success
                  ? styles.command_success
                  : error
                  ? styles.command_error
                  : styles.command
              }
            >
              {running && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className={styles.running_spinner}
                  spin
                />
              )}
              {`${title} ${command}`}
              <CopyToClipboard text={command}>
                <FontAwesomeIcon icon={faCopy} className={styles.copy_icon} />
              </CopyToClipboard>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Terminal;
