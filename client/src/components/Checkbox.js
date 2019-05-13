import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane, majorScale } from "evergreen-ui";

const DEFAULT_SIZE = majorScale(4);

const Checkbox = ({ isChecked, size, ...props }) => {
  const borderProp = `2px solid ${isChecked ? "#C7CED4" : "#E4E7EB"}`;
  const borderProps = {
    borderTop: borderProp,
    borderRight: borderProp,
    borderBottom: borderProp,
    borderLeft: borderProp,
  };

  return (
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
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

Checkbox.defaultProps = {
  size: DEFAULT_SIZE,
};

export default Checkbox;
