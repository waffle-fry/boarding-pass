import React, { useState, useEffect } from "react";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";
import "./styles.scss";
import EmailInput from "../../components/email-input";
import ActionButton from "../../components/action-button";
import data from "../../data.json";
import { Link } from "react-router-dom";

function WelcomeScreen(props) {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(data);
  });

  if (state == null) {
    return "Loading...";
  }

  return (
    <div className="welcome-container">
      <div className="header">
        <img
          src={state.logo}
          className="Logo"
          alt="logo"
          style={{ height: "12.5vh", objectFit: "contain" }}
        />
        <Title text={state.welcome_title} />
        <Subtitle text={state.welcome_subtitle} />
      </div>
      <div className="content">
        <EmailInput email_address={state.email_address} />
        <Link to="/departments">
          <ActionButton value="Get Started" />
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;
