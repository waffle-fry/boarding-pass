import React from "react";
import Item from "./index";
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

test("it renders the correct link", () => {
  render(
    <Router>
      <Item name="Team Awesome" slug="team-awesome" />
    </Router>,
    container
  );

  const link = document.querySelector(".link");

  expect(link.getAttribute("href")).toBe("/team/team-awesome/1");
});

test("it renders the team name", () => {
  render(
    <Router>
      <Item name="Team Awesome" slug="team-awesome" />
    </Router>,
    container
  );

  const name = document.querySelector(".name");

  expect(name.textContent).toBe("Team Awesome");
});
