import React from "react";
import PropTypes from "prop-types";

import LoadingState from "./LoadingState";
import Trips from "./Trips";

const TripsContainer = ({ isFetching, trips, ticket, handleSelect }) =>
  isFetching ? (
    <LoadingState />
  ) : (
    <Trips
      trips={trips}
      selected={ticket && ticket.id}
      handleSelect={handleSelect}
    />
  );

TripsContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(PropTypes.shape()),
  ticket: PropTypes.shape(),
  handleSelect: PropTypes.func.isRequired,
};

TripsContainer.defaultProps = {
  trips: [],
  ticket: {},
};

export default TripsContainer;
