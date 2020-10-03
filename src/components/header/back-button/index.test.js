import React from "react";
import BackButton from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";

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

const mock = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn().mockImplementation(() => ({ goBack: mock })),
}));

test("it renders the expected icon", () => {
  render(<BackButton />, container);

  const backButton = document.querySelector(".container");

  expect(backButton).toBeInTheDocument();
  expect(backButton.firstChild.getAttribute("data-icon")).toBe(
    "long-arrow-alt-left"
  );
});

test("it calls the passed function when pressed", () => {
  render(<BackButton />, container);

  const backButton = document.querySelector(".container");

  backButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  console.log(module);
  expect(mock).toHaveBeenCalled();
});
