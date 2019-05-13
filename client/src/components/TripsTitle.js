import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const headingProps = {
  size: 500,
};

const TripsTitle = ({ from, to }) => (
  <Pane className="TripsTitle" display="flex" paddingBottom={ITEM_SPACE}>
    <Heading {...headingProps}>{from}</Heading>

    <Pane alignSelf="flex-end" marginX={ITEM_SPACE}>
      <Icon icon="arrow-right" color="#234361" />
    </Pane>

    <Heading {...headingProps}>{to}</Heading>
  </Pane>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
