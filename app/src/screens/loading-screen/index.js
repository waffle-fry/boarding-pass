import React, { useState } from "react";
import styles from "./styles.scss";
import app_styles from "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button";

function LoadingScreen(props) {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const error = props.error ? props.error.toJSON() : false;

  const retry = () => {
    let attempts = retryAttempts + 1;
    props.retry();
    setRetryAttempts(attempts);
  };

  return (
    <div className={app_styles.app}>
      <div className={styles.container}>
        <div className={styles.header}>
          <FontAwesomeIcon
            icon={faTicketAlt}
            className={styles.logo}
            size="4x"
          />
          <div className={styles.title}>BOARDING PASS</div>
        </div>
        <div className={styles.content}>
          {(!error && !props.config_malformed) || !props.config_scss_created ? (
            <div className={styles.content}>
              <FontAwesomeIcon
                icon={faSpinner}
                className={styles.spinner}
                size="2x"
                spin
              />
              <div className={styles.message}>Loading config...</div>
            </div>
          ) : (
            <div className={styles.error}>
              <div className={styles.title}>
                There was an error loading your config:
              </div>
              {error && <div>{error.message}</div>}
              {props.config_malformed && (
                <div>The configuration file is malformed</div>
              )}
              {retryAttempts < 3 && !props.config_malformed ? (
                <Button value="Retry" handleClick={retry} />
              ) : (
                <div>
                  {error && (
                    <div className={styles.retry_limit_exceeded_message}>
                      This isn't working... you should probably go talk to
                      someone about it
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
