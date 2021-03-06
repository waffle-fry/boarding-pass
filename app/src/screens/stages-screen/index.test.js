import React from "react";
import StagesScreen from "./index";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import data from "../../data.json";
import { find } from "styled-components/test-utils";
import { LinkButton } from "../../components/button/link";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest
    .fn()
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 1 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 2 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 2 })
    .mockReturnValueOnce({ team: "quantum-pipes", stage: 2 }),
}));

test("it renders the header", () => {
  const { getByText } = render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const title = getByText("Quantum Pipes");
  const subtitle = getByText("Step One: Terminal Setup");

  expect(header).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
  expect(logo.getAttribute("src")).toBe(
    "https://dynl.mktgcdn.com/p/jPpU9bYhzEYWnQ2poYw1EIYj9ha4ySR9guujLOLODIc/400x400.jpg"
  );
});

test("it renders the steps list", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const stepsList = document.querySelector(".header").nextSibling;

  expect(stepsList).toBeInTheDocument();
  expect(stepsList.children.length).toBe(1);
});

test("it renders the action button", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const button = find(document.body, LinkButton);
  expect(button.getAttribute("href")).toBe("/team/quantum-pipes/2");

  expect(button).toBeInTheDocument();
  expect(button.textContent).toBe("Continue");
});

test("it renders the message if one is set", () => {
  render(
    <AppContext.Provider value={data}>
      <Router>
        <StagesScreen />
      </Router>
    </AppContext.Provider>,
    container
  );

  const buttons = document.getElementsByTagName("a");
  const button = buttons[buttons.length - 1];

  button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  const message = document
    .querySelector(".header")
    .nextSibling.querySelector(".text");

  expect(message).toBeInTheDocument();
  expect(message.textContent).toBe(
    "Joe Blogs (joe.blogs@nationwide.co.uk) should have sent you an email with your VPN login details. If not, you’ll need to get in touch with them."
  );
});
