import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane, Text } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

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
