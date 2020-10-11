import React from "react";
import LoadingScreen from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import data from "../../data.json";

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

test("it renders the header", () => {
  render(<LoadingScreen />, container);

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = document.querySelector(".title");

  expect(header).toBeInTheDocument();

  expect(logo.getAttribute("data-icon")).toBe("ticket-alt");
  expect(title.textContent).toBe("BOARDING PASS");
});

test("it renders the spinner when loading", () => {
  render(<LoadingScreen />, container);

  const content = document.querySelector(".content");
  const spinner = content.querySelector(".spinner");
  const loadingMessage = content.querySelector(".message");

  expect(spinner).toBeInTheDocument();
  expect(loadingMessage).toBeInTheDocument();

  expect(spinner.getAttribute("data-icon")).toBe("spinner");
  expect(spinner.getAttribute("class")).toContain("fa-spin");
  expect(loadingMessage.textContent).toBe("Loading config...");
});

test("it renders an error message", () => {
  const error = {
    toJSON: () => ({ message: "Error Message" }),
  };

  render(<LoadingScreen error={error} config_scss_created={true} />, container);

  const content = document.querySelector(".content");
  const spinner = content.querySelector(".spinner");
  const loadingMessage = content.querySelector(".message");

  expect(spinner).not.toBeInTheDocument();
  expect(loadingMessage).not.toBeInTheDocument();

  const errorContainer = content.querySelector(".error");
  const title = errorContainer.querySelector(".title");
  const errorMessage = title.nextSibling;

  expect(errorContainer).toBeInTheDocument();
  expect(title.textContent).toBe("There was an error loading your config:");
  expect(errorMessage.textContent).toBe("Error Message");
});

test("it allows the retry button to be clicked three times before replacing it with a message", () => {
  const error = {
    toJSON: () => ({ message: "Error Message" }),
  };

  const retry = jest.fn();

  render(
    <LoadingScreen error={error} retry={retry} config_scss_created={true} />,
    container
  );

  const retryButton = document.querySelector(".button");

  expect(retryButton).toBeInTheDocument();

  retryButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  retryButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  retryButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  const retryLimitMessage = document.querySelector(
    ".retry_limit_exceeded_message"
  );

  expect(retryButton).not.toBeInTheDocument();
  expect(retryLimitMessage).toBeInTheDocument();
  expect(retryLimitMessage.textContent).toBe(
    "This isn't working... you should probably go talk to someone about it"
  );
});

test("it renders a config malformed message", () => {
  render(
    <LoadingScreen config_malformed={true} config_scss_created={true} />,
    container
  );

  const content = document.querySelector(".content");
  const spinner = content.querySelector(".spinner");
  const loadingMessage = content.querySelector(".message");

  expect(spinner).not.toBeInTheDocument();
  expect(loadingMessage).not.toBeInTheDocument();

  const errorContainer = content.querySelector(".error");
  const title = errorContainer.querySelector(".title");
  const errorMessage = title.nextSibling;
  const retryButton = document.querySelector(".button");

  expect(errorContainer).toBeInTheDocument();
  expect(title.textContent).toBe("There was an error loading your config:");
  expect(errorMessage.textContent).toBe("The configuration file is malformed");
  expect(retryButton).not.toBeInTheDocument();
});
