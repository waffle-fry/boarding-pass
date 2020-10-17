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

function App() {
  const [configScssCreated, setConfigScssCreated] = useState(false);
  const [convertedData, setConvertedData] = useState(null);
  const [theme, setTheme] = useState({});

  const [
    { data, loading, error },
    refetch,
  ] = useAxios(
    "https://raw.githubusercontent.com/waffle-fry/boarding-pass/develop/config/config.yaml",
    { useCache: false }
  );

  useEffect(() => {
    let json = yaml.safeLoad(data);
    setConvertedData(json);
  }, [data]);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      convertedData !== undefined &&
      convertedData !== null &&
      isHexcolor(convertedData.primary_colour) &&
      isHexcolor(convertedData.secondary_colour)
    ) {
      const primaryColour = convertedData.primary_colour;
      const secondaryColour = convertedData.secondary_colour;
      setTheme({ main: primaryColour, secondary: secondaryColour });

      setConfigScssCreated(true);
    } else {
      setConfigScssCreated(true);
    }
  }, [convertedData]);

  if (
    loading ||
    error ||
    !(
      convertedData !== undefined &&
      convertedData !== null &&
      convertedData.constructor == Object
    ) ||
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
    <AppContext.Provider value={convertedData}>
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
