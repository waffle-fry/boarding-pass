import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import WelcomeScreen from "./screens/welcome_screen";
import DepartmentsScreen from "./screens/departments_screen";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/departments">
            <DepartmentsScreen />
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
