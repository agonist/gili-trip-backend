import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, majorScale } from "evergreen-ui";

import Item from "./Item";
import { ITEM_SPACE, IS_MOBILE } from "../constants";
import { getLocationName } from "../helpers";

const itemWidth = IS_MOBILE ? "100%" : "50%";

const PopularItem = ({ from, to, ...props }) => (
  <Item
    className="Popular-item"
    flexGrow={1}
    cursor="pointer"
    width={itemWidth}
    marginRight={ITEM_SPACE}
    {...props}
  >
    <Heading size={600}>{getLocationName(from)}</Heading>
    <Icon flexShrink={0} icon="arrow-right" marginX={majorScale(1)} />
    <Heading size={600}>{getLocationName(to)}</Heading>
  </Item>
);

PopularItem.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default PopularItem;
