import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { Paragraph, Text } from "evergreen-ui";

const FooterLink = ({ children, to }) => (
  <Paragraph>
    <Link to={to} style={{ display: "block" }}>
      <Text display="inline-block" paddingY={2}>
        {children}
      </Text>
    </Link>
  </Paragraph>
);

FooterLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FooterLink;
