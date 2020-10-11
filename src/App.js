import React, { useEffect, useState } from "react";
import styles from "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import AppContext from "./contexts/AppContext";
// import data from "./data.json";
import useAxios from "axios-hooks";
import LoadingScreen from "./screens/loading-screen";
import { exec } from "child_process";
import isHexcolor from "is-hexcolor";

function App() {
  const [configScssCreated, setConfigScssCreated] = useState(false);
  const [
    { data, loading, error },
    refetch,
  ] = useAxios(
    "https://raw.githubusercontent.com/waffle-fry/boarding-pass/develop/src/data.json?token=AMCP4J3K4D4OTAMBVEFJ4KK7PUH3E",
    { useCache: false }
  );

  useEffect(() => {
    if (
      !loading &&
      !error &&
      isHexcolor(data.primary_colour) &&
      isHexcolor(data.secondary_colour)
    ) {
      console.log(data);
      const primaryColour = data.primary_colour;
      const secondaryColour = data.secondary_colour;
      const scss =
        "$" +
        "primary: " +
        primaryColour +
        ";\n" +
        "$" +
        "secondary: " +
        secondaryColour +
        ";";
      new Promise((resolve, reject) => {
        exec("cd src/ && echo '" + scss + "' > config.scss", () => {
          resolve();
        });
      }).then(() => {
        setConfigScssCreated(true);
      });
    } else {
      setConfigScssCreated(true);
    }
  }, [data]);

  if (
    loading ||
    error ||
    !(data !== undefined && data !== null && data.constructor == Object) ||
    !configScssCreated
  ) {
    const configMalformed = !loading && !error;

    return (
      <LoadingScreen
        error={error}
        retry={refetch}
        config_malformed={configMalformed}
        config_scss_created={configScssCreated}
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
