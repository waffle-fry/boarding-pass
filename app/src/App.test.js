import React from "react";
import App from "./App";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import useAxios from "axios-hooks";
import "jest-styled-components";

jest.mock("axios-hooks");

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

test("it renders the loading view when loading the config", () => {
  useAxios.mockReturnValue([{ loading: true }]);
  render(<App />, container);

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = document.querySelector(".title");

  expect(header).toBeInTheDocument();

  expect(logo.getAttribute("data-icon")).toBe("ticket-alt");
  expect(title.textContent).toBe("BOARDING PASS");
});

test("it renders the error message", () => {
  const error = {
    toJSON: () => ({ message: "Error Message" }),
  };
  useAxios.mockReturnValue([{ loading: false, error: error }]);
  render(<App />, container);

  const content = document.querySelector(".content");
  const errorContainer = content.querySelector(".error");
  const title = errorContainer.querySelector(".title");
  const errorMessage = title.nextSibling;

  expect(errorContainer).toBeInTheDocument();
  expect(title.textContent).toBe("There was an error loading your config:");
  expect(errorMessage.textContent).toBe("Error Message");
});

test("it renders the config malformed error message", () => {
  useAxios.mockReturnValue([{ loading: false, error: false, data: "" }]);
  render(<App />, container);

  const content = document.querySelector(".content");
  const errorContainer = content.querySelector(".error");
  const title = errorContainer.querySelector(".title");
  const errorMessage = title.nextSibling;

  expect(errorContainer).toBeInTheDocument();
  expect(title.textContent).toBe("There was an error loading your config:");
  expect(errorMessage.textContent).toBe("The configuration file is malformed");
});

test("it renders the app and sets the theme colours according to the config", () => {
  const data = `
    welcome_title: "Welcome to Nationwide"
    welcome_subtitle: "We're thrilled to have you"
    primary_colour: "#004A8F"
    secondary_colour: "#EC1C24"
  `;
  useAxios.mockReturnValue([{ loading: false, error: false, data: data }]);
  const { getByText } = render(<App />, container);

  const title = getByText("Welcome to Nationwide");
  const subtitle = getByText("We're thrilled to have you");

  expect(title).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
  expect(title).toHaveStyleRule("color", "#004A8F");
  expect(subtitle).toHaveStyleRule("color", "#EC1C24");
});
