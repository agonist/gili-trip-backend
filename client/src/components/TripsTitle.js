import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const headingProps = {
  size: 500,
};

const TripsTitle = ({ from, to }) => (
  <Pane
    className="TripsTitle"
    display="flex"
    alignItems="center"
    paddingBottom={ITEM_SPACE}
  >
    <Heading {...headingProps}>{from}</Heading>
    <Icon
      icon="arrow-right"
      color="#425A70"
      marginX={ITEM_SPACE / 2}
      size={12}
      marginTop={2}
    />
    <Heading {...headingProps}>{to}</Heading>
  </Pane>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
