import React from "react";
import PropTypes from "prop-types";

import Item from "../TripItem";

const Trips = ({ handleSelect, selected, trips }) => (
  <div className="Trips">
    {trips.map(trip => {
      const { id } = trip;
      const isSelected = trip.id === selected;
      const _handleSelect = () => handleSelect(trip);

      // items when another one is selected
      if (selected && !isSelected) {
        return null;
      }

      return (
        <Item
          {...trip}
          key={id}
          handleSelect={_handleSelect}
          isSelected={isSelected}
        />
      );
    })}
  </div>
);

Trips.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

Trips.defaultProps = {
  selected: null,
  trips: [],
};

export default Trips;
