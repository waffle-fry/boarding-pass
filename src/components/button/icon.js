import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./index";

export default (props) => (
  <Button
    primary={props.primary}
    value={<FontAwesomeIcon icon={props.icon} spin={props.spin} />}
  />
);
