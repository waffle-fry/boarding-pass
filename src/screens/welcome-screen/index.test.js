import React from "react";
import WelcomeScreen from "./index";
import { unmountComponentAtNode } from "react-dom";
import { getByAltText, render } from "@testing-library/react";
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

test("it renders the logo", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <WelcomeScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const logo = document.querySelector(".logo");

  expect(logo).toBeInTheDocument();
  expect(logo.getAttribute("src")).toBe(
    "https://dynl.mktgcdn.com/p/jPpU9bYhzEYWnQ2poYw1EIYj9ha4ySR9guujLOLODIc/400x400.jpg"
  );
});

test("it renders the title", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <WelcomeScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const title = document.querySelector(".title");

  expect(title).toBeInTheDocument();
  expect(title.textContent).toBe("Welcome to Nationwide");
});

test("it renders the subtitle", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <WelcomeScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const subtitle = document.querySelector(".subtitle");

  expect(subtitle).toBeInTheDocument();
  expect(subtitle.textContent).toBe("We're thrilled to have you");
});

test("it renders the action button", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <WelcomeScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const button = document.querySelector(".button");

  expect(button.getAttribute("href")).toBe("/teams");

  expect(button).toBeInTheDocument();
  expect(button.textContent).toBe("Get Started");
});
