import React from "react";
import PropTypes from "prop-types";

import { Card } from "evergreen-ui";
import { ITEM_HEIGHT, ITEM_SPACE, IS_MOBILE } from "../constants";

const Item = ({ children, ...props }) => (
  <Card
    display="flex"
    justifyContent="center"
    alignItems="center"
    marginBottom={ITEM_SPACE}
    padding={IS_MOBILE ? ITEM_SPACE * 1.5 : ITEM_HEIGHT}
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
