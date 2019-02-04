import React from "react";
import PropTypes from "prop-types";
import { Pane, Text, majorScale } from "evergreen-ui";

import ArrowIcon from "../ArrowIcon";
import { convertMinsToHrsMins } from "../../helpers";

const Duration = ({ color, duration }) => (
  <Pane
    paddingX={majorScale(4)}
    display="flex"
    justifyContent="center"
    flexDirection="column"
  >
    <Text textAlign="center" color={color}>
      {convertMinsToHrsMins(duration, "h")}
    </Text>

    <ArrowIcon color={color} width={majorScale(6)} />
  </Pane>
);

Duration.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.number.isRequired,
};

Duration.defaultProps = {
  color: "#1070CA",
};

export default Duration;
