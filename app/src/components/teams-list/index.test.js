import React from "react";
import TeamsList from "./index";
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

test("it renders the correct number of teams", () => {
  const teams = [
    { name: "Team Awesome", slug: "team-awesome" },
    { name: "Team Two", slug: "team-two" },
    { name: "Team Three", slug: "team-three" },
  ];

  render(
    <Router>
      <TeamsList teams={teams} />
    </Router>,
    container
  );

  const teamsList = document.querySelector(".container");

  expect(teamsList.children.length).toBe(3);
});
