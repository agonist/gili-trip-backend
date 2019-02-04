import React from "react";
import PropTypes from "prop-types";
import { Heading, majorScale } from "evergreen-ui";

import ArrowIcon from "../ArrowIcon";

const TripsTitle = ({ from, to }) => (
  <Heading
    size={700}
    display="flex"
    alignItems="center"
    marginBottom={majorScale(2)}
  >
    {from}
    <ArrowIcon />
    {to}
  </Heading>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
