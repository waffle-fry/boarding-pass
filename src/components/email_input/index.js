import React from "react";
import "./styles.css";

function EmailInput(props) {
  return (
    <div className="EmailInputContainer">
      <input
        type="email"
        className="EmailInput"
        placeholder={`Enter your ${props.email_address} email address`}
        value={props.value}
        onChange={(text) => props.handleChange(text)}
      />
    </div>
  );
}

export default EmailInput;
