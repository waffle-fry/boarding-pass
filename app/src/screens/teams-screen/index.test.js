import React from "react";
import TeamsScreen from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import data from "../../data.json";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("it renders the header", () => {
  const { getByText } = render(
    <AppContext.Provider value={data}>
      <Router>
        <TeamsScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = getByText("Choose your team");

  expect(header).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(logo.getAttribute("src")).toBe(data.logo);
});

test("it renders the teams list", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <TeamsScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const teamsList = document.querySelector(".header").nextSibling;

  expect(teamsList).toBeInTheDocument();
  expect(teamsList.children.length).toBe(4);
});
