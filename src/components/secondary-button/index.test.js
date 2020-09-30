import React from "react";
import SecondaryButton from "./index";
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
  render(<SecondaryButton value="Press" />, container);

  const secondaryButton = document.querySelector(".button");

  expect(secondaryButton).toBeInTheDocument();
  expect(secondaryButton.value).toBe("Press");
});

test("it calls the passed function when pressed", () => {
  const handleClick = jest.fn();
  render(<SecondaryButton handleClick={handleClick} />, container);

  const secondaryButton = document.querySelector(".button");
  secondaryButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(secondaryButton).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalled();
});
