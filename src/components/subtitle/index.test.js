import React from "react";
import { getByTestId, render } from "@testing-library/react";
import Subtitle from "./index";

test("renders text with correct classname", () => {
  const { getByText } = render(<Subtitle text="This is a Subtitle" />);
  const subtitle = getByText("This is a Subtitle");

  expect(subtitle).toBeInTheDocument();
  expect(subtitle.className).toBe("Text");
});
