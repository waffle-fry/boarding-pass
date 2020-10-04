import React, { useEffect, useState } from "react";
import styles from "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import AppContext from "./contexts/AppContext";
import data from "./data.json";

function App() {
  const [app, setApp] = useState({});

  useEffect(() => {
    setApp(data);
  });

  if (app == null) {
    return "Loading...";
  }

  return (
    <AppContext.Provider value={app}>
      <Router>
        <div className={styles.app}>
          <Routes />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
