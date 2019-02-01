import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, majorScale } from "evergreen-ui";

import Item from "../Item";
import "./index.css";

const PopularItem = ({ from, to, ...props }) => (
  <Item className="Popular-item" flexGrow={1} cursor="pointer" {...props}>
    <Heading size={600}>{from}</Heading>
    <Icon flexShrink={0} icon="arrow-right" marginX={majorScale(1)} />
    <Heading size={600}>{to}</Heading>
  </Item>
);

PopularItem.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default PopularItem;
