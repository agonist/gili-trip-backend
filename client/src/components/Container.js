import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import { ITEM_SPACE, IS_MOBILE } from "../constants";

const SPACING = IS_MOBILE ? ITEM_SPACE : ITEM_SPACE * 2;

const Container = ({ children, ...props }) => (
  <Pane
    width="100%"
    maxWidth="65rem"
    marginX="auto"
    padding={SPACING}
    {...props}
  >
    {children}
  </Pane>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default Container;
