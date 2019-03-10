import React from "react";
import PropTypes from "prop-types";
import { Heading } from "evergreen-ui";

import ArrowIcon from "./ArrowIcon";
import { Mobile } from "./Media";

import { ITEM_SPACE } from "../constants";

const TripsTitle = ({ from, to, ...props }) => (
  <Mobile>
    {isMobile => (
      <Heading
        size={isMobile ? 600 : 700}
        display={isMobile ? "block" : "flex"}
        alignItems="center"
        marginBottom={ITEM_SPACE}
        lineHeight={1.4}
        {...props}
      >
        {from}
        {isMobile ? <br /> : <ArrowIcon />}
        {to}
      </Heading>
    )}
  </Mobile>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
