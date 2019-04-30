import React from "react";
import PropTypes from "prop-types";

import { getOperatorLogo } from "../helpers";

const OperatorLogo = ({ id, subtype, ...props }) => (
  <img src={getOperatorLogo(id)} alt={subtype} width={80} {...props} />
);

OperatorLogo.propTypes = {
  id: PropTypes.number.isRequired,
  subtype: PropTypes.string.isRequired,
};

export default OperatorLogo;
