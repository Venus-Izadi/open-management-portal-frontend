import React from "react";
import { render } from "enzyme";
import PointOfContact from "./02_PointOfContact";
import defaultValues from "../initialState";

test("Basic component renders correctly", () => {
  const component = render(<PointOfContact values={defaultValues} />);
  expect(component).toMatchSnapshot();
});