import React from "react";
import StepsList from "./index";
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

test("it renders a terminal step", () => {
  const steps = [{ type: "terminal", terminal: { commands: [] } }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("terminal");
});

test("it renders a download step", () => {
  const steps = [{ type: "download" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("download");
});

test("it renders a open-folder step", () => {
  const steps = [{ type: "open-folder" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("folder-open");
});

test("it renders a text-input step", () => {
  const steps = [{ type: "text-input" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("keyboard");
});

test("it renders a account step", () => {
  const steps = [{ type: "account" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("user-circle");
});

test("it renders a jira step", () => {
  const steps = [{ type: "jira" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("jira");
});

test("it renders a github step", () => {
  const steps = [{ type: "github" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("github");
});

test("it renders a aws step", () => {
  const steps = [{ type: "aws" }];
  render(<StepsList steps={steps} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("aws");
});
