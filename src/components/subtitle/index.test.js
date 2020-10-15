import React from "react";
import { getByTestId, render } from "@testing-library/react";
import Subtitle from "./index";

test("renders text with correct classname", () => {
  const { getByText } = render(<Subtitle>This is a Subtitle</Subtitle>);
  const subtitle = getByText("This is a Subtitle");

  expect(subtitle).toBeInTheDocument();
});
