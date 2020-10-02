import React from "react";
import ActionLinkButton from "./link";
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

test("it renders the expected value", () => {
  render(
    <Router>
      <ActionLinkButton to="/test-location" value="Press" />
    </Router>,
    container
  );

  const linkButton = document.querySelector(".button");

  expect(linkButton).toBeInTheDocument();
  expect(linkButton.textContent).toBe("Press");
});

test("it renders the expected location", () => {
  render(
    <Router>
      <ActionLinkButton to="/test-location" value="Press" />
    </Router>,
    container
  );

  const linkButton = document.querySelector(".button");

  expect(linkButton).toBeInTheDocument();
  expect(linkButton.getAttribute("href")).toBe("/test-location");
});
