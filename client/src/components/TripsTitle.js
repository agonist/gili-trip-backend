import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane, minorScale } from "evergreen-ui";

import Small from "./Small";

const headingProps = {
  marginBottom: 0,
};

const TripsTitle = ({ from, to }) => (
  <Pane className="TripsTitle" display="flex" alignItems="center">
    <Small {...headingProps}>{from}</Small>

    <Icon marginX={minorScale(1)} icon="arrow-right" color="#66788A" size={8} />

    <Small {...headingProps}>{to}</Small>
  </Pane>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
