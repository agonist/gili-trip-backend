import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import useMedia from "../hooks/useMedia";
import { ITEM_SPACE } from "../constants";

const Container = ({ children, ...props }) => {
  const { isMobile } = useMedia();

  return (
    <Pane
      width="100%"
      maxWidth="65rem"
      marginX="auto"
      padding={isMobile ? ITEM_SPACE : ITEM_SPACE * 2}
      {...props}
    >
      {children}
    </Pane>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default Container;
