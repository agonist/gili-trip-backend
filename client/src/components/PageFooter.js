import React from "react";
import { Pane } from "evergreen-ui";

import Container from "./Container";

const PageFooter = ({ leftButton, rightButton, ...props }) => (
  <Container textAlign="right" {...props}>
    {leftButton && <Pane textAlign="left">{leftButton}</Pane>}
    {rightButton && <Pane textAlign="right">{rightButton}</Pane>}
  </Container>
);

export default PageFooter;
