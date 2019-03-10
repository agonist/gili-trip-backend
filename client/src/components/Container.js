import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import { Mobile } from "./Media";
import { ITEM_SPACE } from "../constants";

const Container = ({ children, ...props }) => (
  <Mobile>
    {isMobile => (
      <Pane
        width="100%"
        maxWidth="65rem"
        marginX="auto"
        padding={isMobile ? ITEM_SPACE : ITEM_SPACE * 2}
        {...props}
      >
        {children}
      </Pane>
    )}
  </Mobile>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default Container;
