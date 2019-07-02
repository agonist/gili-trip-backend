import React from "react";
import PropTypes from "prop-types";

import LoadingState from "./LoadingState";
import Trips from "./Trips";

const TripsContainer = ({ isFetching, ticket, ...props }) =>
  isFetching ? (
    <LoadingState />
  ) : (
    <Trips selected={ticket && ticket.id} {...props} />
  );

TripsContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  ticket: PropTypes.shape(),
};

TripsContainer.defaultProps = {
  ticket: {},
};

export default TripsContainer;
