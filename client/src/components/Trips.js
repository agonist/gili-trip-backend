import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import Item from "./Item";
import Ticket from "./Ticket";
import TicketOpen from "./TicketOpen";
import TripsEmptyState from "./TripsEmptyState";

import { OPEN_RETURN_TRIP_ID } from "../constants";

const Trips = ({ handleSelect, selected, trips, withOpenOption }) => (
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

        {withOpenOption && (
          <TicketOpen
            isSelected={selected === OPEN_RETURN_TRIP_ID}
            handleSelect={() =>
              handleSelect({ id: OPEN_RETURN_TRIP_ID, price: trips[0].price })
            }
            price={trips[0].price}
          />
        )}
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
  withOpenOption: PropTypes.bool,
};

Trips.defaultProps = {
  selected: null,
  trips: [],
  withOpenOption: false,
};

export default Trips;
