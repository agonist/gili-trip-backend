import React from "react";
import { Pane } from "evergreen-ui";

const Container = ({ children, ...props }) => (
  <Pane width="100%" maxWidth="65rem" marginX="auto" paddingX="2rem" {...props}>
    {children}
  </Pane>
);

export default Container;
