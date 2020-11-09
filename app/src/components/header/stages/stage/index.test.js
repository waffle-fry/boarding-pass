import React from "react";
import Stage, { StageContainer, StageSpacer } from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { find } from "styled-components/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import "jest-styled-components";
import data from "../../../../data.json";
import { ThemeProvider } from "styled-components";

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
    <ThemeProvider theme={{ secondary: data.secondary_colour }}>
      <Router>
        <Stage
          key={1}
          stage="Second Stage"
          index={1}
          currentStage="Second Stage"
          stages={["First Stage", "Second Stage"]}
        />
      </Router>
    </ThemeProvider>,
    container
  );

  const stage = find(document.body, StageContainer);

  expect(stage).toHaveStyleRule("color", data.secondary_colour);
  expect(stage.firstChild.getAttribute("href")).toBe("/team/quantum-pipes/2");
});

test("it renders a non-current stage", () => {
  render(
    <ThemeProvider theme={{ secondary: data.secondary_colour }}>
      <Router>
        <Stage
          key={0}
          stage="First Stage"
          index={0}
          currentStage="Second Stage"
          stages={["First Stage", "Second Stage"]}
        />
      </Router>
    </ThemeProvider>,
    container
  );

  const stage = find(document.body, StageContainer);

  expect(stage).toHaveStyleRule("color", "#000000");
  expect(stage.firstChild.getAttribute("href")).toBe("/team/quantum-pipes/1");
});

test("it renders a spacer when there is another element", () => {
  render(
    <ThemeProvider theme={{ secondary: data.secondary_colour }}>
      <Router>
        <Stage
          key={0}
          stage="First Stage"
          index={0}
          currentStage="Second Stage"
          stages={["First Stage", "Second Stage"]}
        />
      </Router>
    </ThemeProvider>,
    container
  );

  const stage = find(document.body, StageSpacer);

  expect(stage).toBeInTheDocument();
});

test("it does not render a spacer when there is not another element", () => {
  render(
    <ThemeProvider theme={{ secondary: data.secondary_colour }}>
      <Router>
        <Stage
          key={1}
          stage="Second Stage"
          index={1}
          currentStage="Second Stage"
          stages={["First Stage", "Second Stage"]}
        />
      </Router>
    </ThemeProvider>,
    container
  );

  const stage = find(document.body, StageSpacer);

  expect(stage).not.toBeInTheDocument();
});
