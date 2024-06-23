import React from "react";
import TestRenderer from "react-test-renderer";

import Tooltip from "./tooltip.tsx";

it("Tooltip renders properly", () => {
  const component = <Tooltip text="Test text" showLoading={true} />;
  const tree = TestRenderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
})