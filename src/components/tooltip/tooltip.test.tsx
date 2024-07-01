import React from "react";
import testRenderer from "react-test-renderer";

import Tooltip from "./tooltip";

it("Tooltip renders properly", () => {
  const component = <Tooltip text="Test text" />;

  const tree = testRenderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveProperty("type", "div");
  expect(tree).toHaveProperty("props.className", "container text text_type_main-medium");
})
