import React from "react";
import PropTypes from "prop-types";

import Item from "../TripItem";

const Trips = ({ trips }) => (
  <div className="Trips">
    {trips.map(({ id, ...trip }) => (
      <Item key={id} {...trip} />
    ))}
  </div>
);

Trips.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      arrival_date: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      departure_date: PropTypes.string.isRequired,
      from: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      operator: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      price: PropTypes.string.isRequired,
      to: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ),
};

Trips.defaultProps = {
  trips: [],
};

export default Trips;
