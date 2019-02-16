import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane, Text, majorScale } from "evergreen-ui";

import Item from "./Item";
import Ticket from "./Ticket";

const Trips = ({ handleSelect, handleUnselect, selected, trips }) => (
  <Pane paddingBottom={selected ? majorScale(1) : 0}>
    {trips.length > 0 ? (
      trips.map(trip => {
        const { id } = trip;
        const isSelected = trip.id === selected;
        const _handleSelect = () => handleSelect(trip);

        // items when another one is selected
        if (selected && !isSelected) {
          return null;
        }

        return (
          <Ticket
            {...trip}
            key={id}
            handleSelect={_handleSelect}
            handleUnselect={handleUnselect}
            isSelected={isSelected}
          />
        );
      })
    ) : (
      <Item>
        <Icon icon="info-sign" color="info" marginRight={majorScale(1)} />
        <Text>There is no trip matching your research</Text>
      </Item>
    )}
  </Pane>
);

Trips.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  handleUnselect: PropTypes.func.isRequired,
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
