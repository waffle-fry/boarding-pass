import React from "react";
import Stages from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { findAll } from "styled-components/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import "jest-styled-components";
import { StageContainer } from "./stage";

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

test("it renders the current stage", () => {
  render(
    <Router>
      <Stages
        currentStage="First Stage"
        stages={["First Stage", "Second Stage", "Third Stage"]}
      />
    </Router>,
    container
  );

  const stages = findAll(document.body, StageContainer);

  expect(stages.length).toBe(3);
});
