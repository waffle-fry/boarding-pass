import React from "react";
import TeamsScreen from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

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
    <Router>
      <TeamsScreen />
    </Router>,
    container
  );

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = document.querySelector(".title");

  expect(header).toBeInTheDocument();
  expect(logo.getAttribute("src")).toBe(
    "https://dynl.mktgcdn.com/p/jPpU9bYhzEYWnQ2poYw1EIYj9ha4ySR9guujLOLODIc/400x400.jpg"
  );
  expect(title.textContent).toBe("Choose your team");
});

test("it renders the teams list", () => {
  render(
    <Router>
      <TeamsScreen />
    </Router>,
    container
  );

  const teamsList = document.querySelector(".header").nextSibling;

  expect(teamsList).toBeInTheDocument();
  expect(teamsList.children.length).toBe(4);
});
