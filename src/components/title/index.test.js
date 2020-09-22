import React from "react";
import { getByTestId, render } from "@testing-library/react";
import Title from "./index";

test("renders text with correct classname", () => {
  const { getByText } = render(<Title text="This is a Title" />);
  const title = getByText("This is a Title");

  expect(title).toBeInTheDocument();
  expect(title.className).toBe("Text");
});
