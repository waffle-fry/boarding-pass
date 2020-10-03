import React from "react";
import styles from "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes />
      </div>
    </Router>
  );
}

export default App;
