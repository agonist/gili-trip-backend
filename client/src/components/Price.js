import PropTypes from "prop-types";
import { CURRENCY } from "../constants";

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});

const Price = ({ value }) => numberFormatter.format(value);

Price.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Price;
