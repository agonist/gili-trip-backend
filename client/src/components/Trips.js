import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import Item from "./Item";
import Ticket from "./Ticket";
import TripsEmptyState from "./TripsEmptyState";

const Trips = ({ handleSelect, selected, trips }) => (
  <Pane className="Trips">
    {trips.length === 0 ? (
      <TripsEmptyState />
    ) : (
      <Item flexDirection="column" padding={0}>
        {trips.map((trip, i) => {
          const isSelected = trip.id === selected;
          const isLast = i + 1 === trips.length;
          const _handleSelect = () => handleSelect(trip);

          return (
            <Ticket
              {...trip}
              key={trip.id}
              handleSelect={_handleSelect}
              hasBorder={!isLast}
              isSelected={isSelected}
            />
          );
        })}
      </Item>
    )}
  </Pane>
);

Trips.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ),
};

Trips.defaultProps = {
  selected: null,
  trips: [],
};

export default Trips;
