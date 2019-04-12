import React from "react";
import PropTypes from "prop-types";

import Item from "./Item";
import { ITEM_HEIGHT } from "../constants";

const TicketPileItems = ({ baseZindex, isShown }) => {
  return [1, 2].map(index => {
    const height = `${ITEM_HEIGHT}px`;
    const spaceX = `${index * 2}%`;
    const bottom = `${0 - index * 5}%`;
    const yPosition = isShown ? 0 : `-${height}`;

    const computedPops = {
      height,
      bottom,
      left: spaceX,
      right: spaceX,
      zIndex: baseZindex - index,
      transform: `translateY(${yPosition})`,
    };

    return (
      <Item
        {...computedPops}
        key={index}
        position="absolute"
        padding={0}
        margin={0}
        transition="transform .2s ease-out"
      />
    );
  });
};
TicketPileItems.propTypes = {
  baseZindex: PropTypes.number,
  isShown: PropTypes.bool,
};

TicketPileItems.defaultProps = {
  baseZindex: 10,
  isShown: false,
};

export default TicketPileItems;
