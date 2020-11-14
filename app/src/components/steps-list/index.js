import React from "react";
import styles from "./styles.scss";
import Step from "./step";
import TerminalStep from "./step/terminal";
import {
  faDownload,
  faFolderOpen,
  faKeyboard,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faAws, faGithub, faJira } from "@fortawesome/free-brands-svg-icons";

function StepsList(props) {
  return (
    <div className={styles.container}>
      {props.steps.map((step, index) => {
        switch (step.type) {
          case "terminal":
            return (
              <TerminalStep
                {...step}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "download":
            return (
              <Step
                {...step}
                icon={faDownload}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "open-folder":
            return (
              <Step
                {...step}
                icon={faFolderOpen}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "text-input":
            return (
              <Step
                {...step}
                icon={faKeyboard}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "account":
            return (
              <Step
                {...step}
                icon={faUserCircle}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "jira":
            return (
              <Step
                {...step}
                icon={faJira}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "github":
            return (
              <Step
                {...step}
                icon={faGithub}
                key={`step-${index}`}
                number={index + 1}
              />
            );

          case "aws":
            return (
              <Step
                {...step}
                icon={faAws}
                key={`step-${index}`}
                number={index + 1}
              />
            );
        }
      })}
    </div>
  );
}

export default StepsList;
