import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane, majorScale } from "evergreen-ui";

const OUTSIDE_BORDER = "2px solid #E4E7EB";
const DEFAULT_SIZE = majorScale(4);

const borderProps = {
  borderTop: OUTSIDE_BORDER,
  borderRight: OUTSIDE_BORDER,
  borderBottom: OUTSIDE_BORDER,
  borderLeft: OUTSIDE_BORDER,
};

const Checkbox = ({ isChecked, size, ...props }) => (
  <Pane
    display="flex"
    justifyContent="center"
    alignItems="center"
    width={size}
    height={size}
    backgroundColor={isChecked ? "#47B881" : "#FFF"}
    boxShadow="inset 0 0 0 2px #FFF"
    borderRadius={size}
    {...borderProps}
    {...props}
  >
    <Pane
      display="flex"
      justifyContent="center"
      alignItems="center"
      opacity={isChecked ? 1 : 0}
      transform={`scale(${isChecked ? 1 : 0.4})`}
      transition="all .2s ease-out"
    >
      <Icon icon="tick" color="#FFF" size={12} />
    </Pane>
  </Pane>
);

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

Checkbox.defaultProps = {
  size: DEFAULT_SIZE,
};

export default Checkbox;
