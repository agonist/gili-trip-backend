import React from "react";
import { Pane } from "evergreen-ui";

const Container = ({ children, ...props }) => (
  <Pane width="100%" maxWidth="65rem" marginX="auto" padding="2rem" {...props}>
    {children}
  </Pane>
);

export default Container;
