import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane, Text } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const IconWithBackground = () => (
  <Pane
    width={ITEM_SPACE * 2}
    height={ITEM_SPACE * 2}
    marginRight={ITEM_SPACE}
    borderRadius="50%"
    backgroundColor="#DDEBF7"
    display="flex"
    alignItems="center"
    alignSelf="center"
    justifyContent="center"
  >
    <Icon icon="full-circle" size={7} color="#1070CA" />
  </Pane>
);

const textProps = {
  display: "block",
  fontSize: 10,
  textTransform: "uppercase",
  color: "#66788A",
};

const headingProps = {
  size: 500,
};

const TripsTitle = ({ from, to }) => (
  <Pane className="TripsTitle" display="flex" paddingBottom={ITEM_SPACE}>
    <IconWithBackground />

    <Heading {...headingProps}>
      <Text {...textProps}>From</Text>
      {from}
    </Heading>

    <Pane alignSelf="flex-end" marginX={ITEM_SPACE}>
      <Icon icon="arrow-right" color="#234361" />
    </Pane>

    <Heading {...headingProps}>
      <Text {...textProps}>To</Text>
      {to}
    </Heading>
  </Pane>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
