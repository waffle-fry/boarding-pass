import React from "react";
import styles from "./styles.scss";

function EmailInput(props) {
  return (
    <div className={styles.email_input}>
      <input
        type="email"
        className={styles.input}
        placeholder={`Enter your ${props.email_address} email address`}
        value={props.value}
        onChange={(text) => props.handleChange(text)}
      />
    </div>
  );
}

export default EmailInput;
