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
import yaml from "js-yaml";
import { ThemeProvider } from "styled-components";
import url from "../configurl";

function App() {
  const [configScssCreated, setConfigScssCreated] = useState(false);
  const [convertedData, setConvertedData] = useState(null);
  const [theme, setTheme] = useState({});

  const [{ data, loading, error }, refetch] = useAxios(url, {
    useCache: false,
  });

  // useEffect(() => {
  //   let json = yaml.safeLoad(data);
  //   setConvertedData(json);
  // }, [data]);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      data !== undefined &&
      data !== null &&
      isHexcolor(data.primary_colour) &&
      isHexcolor(data.secondary_colour)
    ) {
      const primaryColour = data.primary_colour;
      const secondaryColour = data.secondary_colour;
      setTheme({ main: primaryColour, secondary: secondaryColour });

      setConfigScssCreated(true);
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
      <ThemeProvider theme={theme}>
        <Router>
          <div className={styles.app}>
            <Routes />
          </div>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
