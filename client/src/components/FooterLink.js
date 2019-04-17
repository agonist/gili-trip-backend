import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { Text } from "evergreen-ui";

import P from "./P";

const FooterLink = ({ children, to }) => (
  <P margin={0}>
    <Link to={to} style={{ display: "block" }}>
      <Text display="inline-block" paddingY={2}>
        {children}
      </Text>
    </Link>
  </P>
);

FooterLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FooterLink;
