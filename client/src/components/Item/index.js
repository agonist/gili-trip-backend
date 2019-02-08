import React from "react";
import PropTypes from "prop-types";

import { Card, majorScale } from "evergreen-ui";

const Item = ({ children, ...props }) => (
  <Card
    display="flex"
    justifyContent="center"
    alignItems="center"
    marginBottom="1rem"
    padding={majorScale(5)}
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
