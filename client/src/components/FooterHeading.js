import React from "react";
import PropTypes from "prop-types";
import { Heading } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const FooterHeading = ({ children, ...props }) => (
  <Heading marginBottom={ITEM_SPACE / 2} {...props}>
    {children}
  </Heading>
);

FooterHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FooterHeading;
