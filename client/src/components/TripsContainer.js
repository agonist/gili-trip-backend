import React from "react";
import PropTypes from "prop-types";

import TripsTitle from "./TripsTitle";
import LoadingState from "./LoadingState";
import Trips from "./Trips";

const TripsContainer = ({
  from,
  to,
  isFetching,
  trips,
  ticket,
  handleSelect,
}) => (
  <>
    <TripsTitle from={from} to={to} />
    {isFetching ? (
      <LoadingState />
    ) : (
      <Trips
        trips={trips}
        selected={ticket && ticket.id}
        handleSelect={handleSelect}
      />
    )}
  </>
);

TripsContainer.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
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
