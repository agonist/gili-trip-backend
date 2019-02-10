import React from "react";
import { Pane } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const Container = ({ children, ...props }) => (
  <Pane
    width="100%"
    maxWidth="65rem"
    marginX="auto"
    padding={ITEM_SPACE * 2}
    {...props}
  >
    {children}
  </Pane>
);

export default Container;
