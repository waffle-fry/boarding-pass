import React from "react";
import "./styles.scss";

function EmailInput(props) {
  return (
    <div className="email-input">
      <input
        type="email"
        className="input"
        placeholder={`Enter your ${props.email_address} email address`}
        value={props.value}
        onChange={(text) => props.handleChange(text)}
      />
    </div>
  );
}

export default EmailInput;
