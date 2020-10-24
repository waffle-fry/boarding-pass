import React from "react";
import Message from "./index";
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

const message = { title: "Message Title", text: "This is a message" };

test("it renders the expected icon", () => {
  render(<Message {...message} />, container);

  const container = document.querySelector(".icon_container");
  const icon = container.firstChild;

  expect(icon).toBeInTheDocument();
  expect(icon.getAttribute("data-icon")).toBe("exclamation");
});

test("it calls the expected title", () => {
  render(<Message {...message} />, container);

  const title = document.querySelector(".title");

  expect(title).toBeInTheDocument();
  expect(title.textContent).toBe("Message Title");
});

test("it calls the expected text", () => {
  render(<Message {...message} />, container);

  const text = document.querySelector(".text");

  expect(text).toBeInTheDocument();
  expect(text.textContent).toBe("This is a message");
});
