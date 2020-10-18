import React from "react";
import Header from "./index";
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

test("it renders the logo and title without a subtitle", () => {
  const { getByText } = render(
    <Header logo="logo-image" title="This is a title" />,
    container
  );

  const header = document.querySelector(".header");
  const logo = header.querySelector(".logo");
  const title = getByText("This is a title");

  expect(header).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
  expect(title).toBeInTheDocument();

  expect(logo.getAttribute("src")).toBe("logo-image");
  expect(header.childElementCount).toBe(3);
});

test("it renders the logo and title wit a subtitle", () => {
  const { getByText } = render(
    <Header
      logo="logo-image"
      title="This is a title"
      subtitle="This is a subtitle"
    />,
    container
  );

  const header = document.querySelector(".header");
  const logo = header.querySelector(".logo");
  const title = getByText("This is a title");
  const subtitle = getByText("This is a subtitle");

  expect(header).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();

  expect(logo.getAttribute("src")).toBe("logo-image");
});
