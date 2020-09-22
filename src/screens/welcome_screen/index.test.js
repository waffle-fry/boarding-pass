import React from "react";
import { getByAltText, render } from "@testing-library/react";
import WelcomeScreen from "./index";
import { BrowserRouter as Router } from "react-router-dom";

test("renders logo", () => {
  const { getByAltText } = render(
    <Router>
      <WelcomeScreen />
    </Router>
  );
  const logo = getByAltText("logo");

  expect(logo).toBeInTheDocument();
});

test("renders welcome message", () => {
  const { getByText } = render(
    <Router>
      <WelcomeScreen />
    </Router>
  );
  const title = getByText("Welcome to Nationwide");

  expect(title).toBeInTheDocument();
});

test("renders subtitle", () => {
  const { getByText } = render(
    <Router>
      <WelcomeScreen />
    </Router>
  );
  const subtitle = getByText("We're thrilled to have you");

  expect(subtitle).toBeInTheDocument();
});

test("renders email input", () => {
  const { getByPlaceholderText } = render(
    <Router>
      <WelcomeScreen />
    </Router>
  );
  const emailInput = getByPlaceholderText(
    "Enter your @nationwide.co.uk email address"
  );

  expect(emailInput).toBeInTheDocument();
});

test("renders action button", () => {
  const { getByText } = render(
    <Router>
      <WelcomeScreen />
    </Router>
  );
  const actionButton = getByText("Get Started");

  expect(actionButton).toBeInTheDocument();
});
