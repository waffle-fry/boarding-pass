import React from "react";
import OnboardingScreen from "./index";
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
  render(
    <AppContext.Provider value={data}>
      <Router>
        <OnboardingScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = document.querySelector(".title");

  expect(header).toBeInTheDocument();

  expect(logo.getAttribute("data-icon")).toBe("plane-departure");
  expect(title.textContent).toBe("YOU'RE ALL SET");
});

test("it renders the content", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <OnboardingScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const content = document.querySelector(".content");

  expect(content).toBeInTheDocument();
  expect(content.textContent).toBe(
    "You're officially onboarded - and now your journey at Nationwide can really begin!"
  );
});
