import React from "react";
import { getByAltText, render } from "@testing-library/react";
import DepartmentsScreen from "./index";

test("renders header", () => {
  const { getByAltText, getByText } = render(<DepartmentsScreen />);
  const logo = getByAltText("logo");
  const title = getByText("Choose your department");

  expect(logo).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});
