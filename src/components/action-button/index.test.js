import React from "react";
import ActionButton from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";

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

test("it renders the expected value", () => {
  render(<ActionButton value="Press" />, container);

  const actionButton = document.querySelector(".button");

  expect(actionButton).toBeInTheDocument();
  expect(actionButton.value).toBe("Press");
});

test("it calls the passed function when pressed", () => {
  const handleClick = jest.fn();
  render(<ActionButton handleClick={handleClick} />, container);

  const actionButton = document.querySelector(".button");
  actionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(actionButton).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalled();
});
