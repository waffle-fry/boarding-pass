import React, { useEffect, useState } from "react";
import styles from "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import AppContext from "./contexts/AppContext";
import data from "./data.json";
import useAxios from "axios-hooks";
import LoadingScreen from "./screens/loading-screen";

function App() {
  const [{ data, loading, error }, refetch] = useAxios("");

  if (
    loading ||
    error ||
    !(data !== undefined && data !== null && data.constructor == Object)
  ) {
    const configMalformed = !loading && !error;

    return (
      <LoadingScreen
        error={error}
        retry={refetch}
        config_malformed={configMalformed}
      />
    );
  }

  return (
    <AppContext.Provider value={data}>
      <Router>
        <div className={styles.app}>
          <Routes />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
