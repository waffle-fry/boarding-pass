import React from "react";
import styles from "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomeScreen from "./screens/welcome-screen";
import TeamsScreen from "./screens/teams-screen";
import StagesScreen from "./screens/stages-screen";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
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
      </div>
    </Router>
  );
}

export default App;
