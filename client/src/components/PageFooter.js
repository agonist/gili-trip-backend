import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import Container from "./Container";

const PageFooter = ({ leftButton, rightButton, ...props }) => (
  <Container textAlign="right" {...props}>
    {leftButton && <Pane textAlign="left">{leftButton}</Pane>}
    {rightButton && <Pane textAlign="right">{rightButton}</Pane>}
  </Container>
);

PageFooter.propTypes = {
  leftButton: PropTypes.node,
  rightButton: PropTypes.node,
};

PageFooter.defaultProps = {
  leftButton: null,
  rightButton: null,
};

export default PageFooter;
