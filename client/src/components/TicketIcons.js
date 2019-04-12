import React from "react";
import PropTypes from "prop-types";
import { Icon } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const iconProps = {
  size: 24,
  color: "#FFF",
  position: "absolute",
  left: "50%",
  marginLeft: -12,
  bottom: ITEM_SPACE * 2,
  transition: "all 0.2s ease-out",
};

const iconHoverableProps = {
  opacity: 0,
  transform: "scale(0.5)",
};

const iconHoveredProps = {
  opacity: 1,
  transform: "scale(1)",
};

const TicketIcons = ({ isHovering, isSelected }) =>
  isSelected ? (
    <>
      <Icon
        {...iconProps}
        {...iconHoverableProps}
        {...isHovering && iconHoveredProps}
        icon="cross"
      />
      <Icon
        {...iconProps}
        {...iconHoverableProps}
        {...!isHovering && iconHoveredProps}
        icon="tick-circle"
      />
    </>
  ) : (
    <Icon {...iconProps} icon="arrow-right" />
  );

TicketIcons.propTypes = {
  isHovering: PropTypes.bool,
  isSelected: PropTypes.bool,
};

TicketIcons.defaultProps = {
  isHovering: false,
  isSelected: false,
};

export default TicketIcons;
