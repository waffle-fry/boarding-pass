import React from "react";
import Header from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { find } from "styled-components/test-utils";
import { Stages } from "./stages";
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ team: "quantum-pipes", stage: 1 }),
}));

test("it renders the logo and title without a subtitle", () => {
  const { getByText } = render(
    <Header logo="logo-image" title="This is a title" />,
    container
  );

  const header = document.querySelector(".header");
  const logo = header.querySelector(".logo");
  const title = getByText("This is a title");

  expect(header).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
  expect(title).toBeInTheDocument();

  expect(logo.getAttribute("src")).toBe("logo-image");
  expect(header.childElementCount).toBe(3);
});

test("it renders the stages on the stages screen", () => {
  render(
    <Router>
      <Header
        logo="logo-image"
        title="This is a title"
        currentStage="First Stage"
        stages={["First Stage", "Second Stage"]}
      />
    </Router>,
    container
  );

  const stages = find(document.body, Stages);

  expect(stages).toBeInTheDocument();
});
