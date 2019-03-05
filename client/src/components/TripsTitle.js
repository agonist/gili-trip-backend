import React from "react";
import PropTypes from "prop-types";
import { Heading } from "evergreen-ui";

import ArrowIcon from "./ArrowIcon";
import { ITEM_SPACE, IS_MOBILE } from "../constants";

const headingSize = IS_MOBILE ? 600 : 700;

const TripsTitle = ({ from, to, ...props }) => (
  <Heading
    size={headingSize}
    display={IS_MOBILE ? "block" : "flex"}
    alignItems="center"
    marginBottom={ITEM_SPACE}
    lineHeight={1.4}
    {...props}
  >
    {from}
    {IS_MOBILE ? <br /> : <ArrowIcon />}
    {to}
  </Heading>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
