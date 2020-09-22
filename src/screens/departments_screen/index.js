import React, { useState, useEffect, useCallback } from "react";
import ActionButton from "../../components/action_button";
import Header from "../../components/header";
import data from "./../../data.json";
import { exec, spawn } from "child_process";

function DepartmentsScreen() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(data);
  });

  const doStuff = useCallback(() => {
    // const { exec, spawn } = require("child_process");
    // const ls = spawn("ls", ["-lh", "/usr"]);

    // ls.stdout.on("data", (data) => {
    //   console.log(`stdout: ${data}`);
    // });

    // ls.stderr.on("data", (data) => {
    //   console.error(`stderr: ${data}`);
    // });

    // ls.on("close", (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });
    exec("ls -la", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  });

  if (state == null) {
    return "Loading...";
  }

  return (
    <div className="Container">
      <Header logo={state.logo} title="Choose your department" />
      <ActionButton value="Do Stuff" handleClick={doStuff} />
    </div>
  );
}

export default DepartmentsScreen;
