import React from "react";
import SecondaryIconButton from "./icon";
import { unmountComponentAtNode } from "react-dom";
import { getByRole, render } from "@testing-library/react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

test("it renders the expected icon", () => {
  render(<SecondaryIconButton icon={faSpinner} />, container);

  const iconButton = document.querySelector(".button");
  const icon = iconButton.firstChild;

  expect(iconButton).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("spinner");
});

test("it renders and spins the expected icon", () => {
  render(<SecondaryIconButton icon={faSpinner} spin />, container);

  const iconButton = document.querySelector(".button");
  const icon = iconButton.firstChild;

  expect(iconButton).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("spinner");
  expect(icon.getAttribute("class")).toContain("fa-spin");
});

test("it calls the passed function when pressed", () => {
  const handleClick = jest.fn();
  render(
    <SecondaryIconButton icon={faSpinner} handleClick={handleClick} />,
    container
  );

  const iconButton = document.querySelector(".button");
  iconButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(iconButton).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalled();
});
