import React from "react";
import StagesScreen from "./index";
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ team: "quantum-pipes", stage: 1 }),
}));

test("it renders the header", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = document.querySelector(".title");
  const subtitle = document.querySelector(".subtitle");

  expect(header).toBeInTheDocument();
  expect(logo.getAttribute("src")).toBe(
    "https://dynl.mktgcdn.com/p/jPpU9bYhzEYWnQ2poYw1EIYj9ha4ySR9guujLOLODIc/400x400.jpg"
  );
  expect(title.textContent).toBe("Quantum Pipes");
  expect(subtitle.textContent).toBe("Step One: Terminal Setup");
});

test("it renders the steps list", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const stepsList = document.querySelector(".header").nextSibling;

  expect(stepsList).toBeInTheDocument();
  expect(stepsList.children.length).toBe(1);
});

test("it renders the action button", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const button = document.querySelector("a");

  expect(button.getAttribute("href")).toBe("/team/quantum-pipes/2");

  expect(button).toBeInTheDocument();
  expect(button.textContent).toBe("Continue");
});
