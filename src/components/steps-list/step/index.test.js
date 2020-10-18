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

  const { getByText } = render(
    <Step {...steps} number="1" icon={faDownload} />,
    container
  );

  const stepNumber = getByText("1");

  expect(stepNumber).toBeInTheDocument();
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

  const { getByText } = render(
    <Step {...step} number="1" icon={faDownload} />,
    container
  );

  const title = getByText("Download a file");

  expect(title).toBeInTheDocument();
});

test("it renders the text", () => {
  const step = {
    type: "download",
    title: "Download a file",
    text: "Download and open the file.",
  };

  const { getByText } = render(
    <Step {...step} number="1" icon={faDownload} />,
    container
  );

  const text = getByText("Download and open the file.");

  expect(text).toBeInTheDocument();
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

  const { getByText } = render(
    <Step {...step} number="1" icon={faDownload} />,
    container
  );

  const buttonContainer = getByText("Action!");

  expect(buttonContainer).toBeInTheDocument();
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

  const iconButton = document.getElementsByTagName("button")[0];
  const icon = iconButton.firstChild;

  expect(iconButton).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("spinner");
  expect(icon.getAttribute("class")).toContain("fa-spin");
});
