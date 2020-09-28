import React from "react";
import { getByAltText, render } from "@testing-library/react";
import DepartmentsScreen from "./index";
import { BrowserRouter as Router } from "react-router-dom";

test("renders header", () => {
  const { getByAltText, getByText } = render(
    <Router>
      <DepartmentsScreen />
    </Router>
  );
  const logo = getByAltText("logo");
  const title = getByText("Choose your team");

  expect(logo).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});
