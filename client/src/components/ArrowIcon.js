import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const ArrowIcon = ({ color, direction, width }) => (
  <Pane
    display="flex"
    alignItems="center"
    justifyContent="center"
    marginX={ITEM_SPACE}
  >
    {direction === "right" ? (
      <React.Fragment>
        <Pane
          width={width}
          height={2}
          backgroundColor={color}
          display="inline-block"
          marginRight={-2}
        />
        <Icon icon="arrow-right" color={color} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Icon icon="arrow-left" color={color} />
        <Pane
          width={width}
          height={2}
          backgroundColor={color}
          display="inline-block"
          marginLeft={-2}
        />
      </React.Fragment>
    )}
  </Pane>
);

ArrowIcon.propTypes = {
  color: PropTypes.string,
  direction: PropTypes.oneOf(["right", "left"]),
  width: PropTypes.number,
};

ArrowIcon.defaultProps = {
  color: "#234361",
  direction: "right",
  width: ITEM_SPACE,
};

export default ArrowIcon;
