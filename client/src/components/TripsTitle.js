import React from "react";
import PropTypes from "prop-types";
import { Heading } from "evergreen-ui";

import ArrowIcon from "./ArrowIcon";
import { ITEM_SPACE } from "../constants";

const TripsTitle = ({ from, to }) => (
  <Heading
    size={700}
    display="flex"
    alignItems="center"
    marginBottom={ITEM_SPACE}
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
