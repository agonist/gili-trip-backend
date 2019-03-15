import React from "react";
import PropTypes from "prop-types";
import { Heading } from "evergreen-ui";

import { CURRENCY_SYMBOL } from "../constants";

const Price = ({ price }) => (
  <Heading size={700} textAlign="center" fontWeight={600}>
    {`${price}${CURRENCY_SYMBOL}`}
  </Heading>
);

Price.propTypes = {
  price: PropTypes.string.isRequired,
};

export default Price;
