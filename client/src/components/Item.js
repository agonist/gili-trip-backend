import React from "react";
import PropTypes from "prop-types";
import { Card } from "evergreen-ui";

import useMedia from "../hooks/useMedia";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const Item = ({ children, ...props }) => {
  const { isMobile } = useMedia();

  return (
    <Card
      className="Item"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={ITEM_SPACE}
      padding={isMobile ? ITEM_SPACE * 1.5 : ITEM_HEIGHT}
      elevation={2}
      backgroundColor="#fff"
      {...props}
    >
      {children}
    </Card>
  );
};

Item.propTypes = {
  children: PropTypes.node,
};

Item.defaultProps = {
  children: null,
};

export default Item;
