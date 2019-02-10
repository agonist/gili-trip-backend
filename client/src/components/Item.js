import React from "react";
import PropTypes from "prop-types";

import { Card } from "evergreen-ui";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const Item = ({ children, ...props }) => (
  <Card
    display="flex"
    justifyContent="center"
    alignItems="center"
    marginBottom={ITEM_SPACE}
    padding={ITEM_HEIGHT}
    elevation={2}
    backgroundColor="#fff"
    {...props}
  >
    {children}
  </Card>
);

Item.propTypes = {
  children: PropTypes.node,
};

Item.defaultProps = {
  children: null,
};

export default Item;
