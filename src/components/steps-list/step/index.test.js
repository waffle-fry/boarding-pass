import React from "react";
import Step from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

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

test("it renders the step number", () => {
  const steps = [
    {
      type: "download",
      title: "Download a file",
      text: "Download and open the file.",
    },
  ];

  render(<Step {...steps} number="1" icon={faDownload} />, container);

  const stepNumber = document.querySelector(".step_number");

  expect(stepNumber).toBeInTheDocument();
  expect(stepNumber.textContent).toBe("1");
});

test("it renders the icon", () => {
  const steps = [
    {
      type: "download",
      title: "Download a file",
      text: "Download and open the file.",
    },
  ];

  render(<Step {...steps} number="1" icon={faDownload} />, container);

  const icon = document.querySelector(".icon");

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("download");
});

test("it renders the title", () => {
  const step = {
    type: "download",
    title: "Download a file",
    text: "Download and open the file.",
  };

  render(<Step {...step} number="1" icon={faDownload} />, container);

  const title = document.querySelector(".title");

  expect(title).toBeInTheDocument();
  expect(title.textContent).toBe("Download a file");
});

test("it renders the text", () => {
  const step = {
    type: "download",
    title: "Download a file",
    text: "Download and open the file.",
  };

  render(<Step {...step} number="1" icon={faDownload} />, container);

  const text = document.querySelector(".text");

  expect(text).toBeInTheDocument();
  expect(text.textContent).toBe("Download and open the file.");
});

test("it renders an additional view", () => {
  const step = {
    type: "download",
    title: "Download a file",
    text: "Download and open the file.",
  };

  const additionalView = <div className="additional_view">Extra content</div>;

  render(
    <Step
      {...step}
      number="1"
      icon={faDownload}
      additional_view={additionalView}
    />,
    container
  );

  const view = document.querySelector(".additional_view");

  expect(view).toBeInTheDocument();
  expect(view.textContent).toBe("Extra content");
});

test("it renders an action button", () => {
  const step = {
    type: "download",
    title: "Download a file",
    text: "Download and open the file.",
    action_button: {
      enabled: true,
      title: "Action!",
    },
  };

  render(<Step {...step} number="1" icon={faDownload} />, container);

  const buttonContainer = document.querySelector(".secondary_button");

  expect(buttonContainer).toBeInTheDocument();
  expect(buttonContainer.firstChild.value).toBe("Action!");
});

test("it renders a spinner when the action is running", () => {
  const step = {
    type: "download",
    title: "Download a file",
    text: "Download and open the file.",
    action_button: {
      enabled: true,
      title: "Action!",
    },
  };

  render(
    <Step {...step} number="1" icon={faDownload} action_running />,
    container
  );

  const iconButton = document.querySelector(".button");
  const icon = iconButton.firstChild;

  expect(iconButton).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("spinner");
  expect(icon.getAttribute("class")).toContain("fa-spin");
});
