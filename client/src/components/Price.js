import React from "react";
import PropTypes from "prop-types";
import { Heading } from "evergreen-ui";

const Price = ({ price, currency }) => (
  <Heading size={700} textAlign="center" fontWeight={600}>
    {price} {currency}
  </Heading>
);

Price.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Price;
