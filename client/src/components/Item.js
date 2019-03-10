import React from "react";
import PropTypes from "prop-types";
import { Card } from "evergreen-ui";

import { Mobile } from "./Media";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const Item = ({ children, ...props }) => (
  <Mobile>
    {isMobile => (
      <Card
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
    )}
  </Mobile>
);

Item.propTypes = {
  children: PropTypes.node,
};

Item.defaultProps = {
  children: null,
};

export default Item;
