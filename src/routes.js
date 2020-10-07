import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import WelcomeScreen from "./screens/welcome-screen";
import TeamsScreen from "./screens/teams-screen";
import StagesScreen from "./screens/stages-screen";
import OnboardedScreen from "./screens/onboarded-screen";

function Routes() {
  const history = useHistory();
  useEffect(() => {
    const previousScreen = localStorage.getItem("previous-screen");
    if (previousScreen != null) {
      localStorage.removeItem("previous-screen");
      history.push(previousScreen);
    }
  });

  const location = useLocation();
  useEffect(() => {
    const storeScreen = () => {
      if (location.pathname != "/onboarded")
        localStorage.setItem("previous-screen", location.pathname);
    };

    window.addEventListener("beforeunload", storeScreen);

    return () => {
      window.removeEventListener("beforeunload", storeScreen);
    };
  });

  return (
    <Switch>
      <Route path="/onboarded">
        <OnboardedScreen />
      </Route>
      <Route path="/team/:team/:stage">
        <StagesScreen />
      </Route>
      <Route path="/teams">
        <TeamsScreen />
      </Route>
      <Route path="/">
        <WelcomeScreen />
      </Route>
    </Switch>
  );
}

export default Routes;
