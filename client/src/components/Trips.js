import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane, Paragraph, minorScale } from "evergreen-ui";

import Item from "./Item";
import Ticket from "./Ticket";
import TripsTitle from "./TripsTitle";

import { ITEM_HEIGHT } from "../constants";

const Trips = ({ from, to, handleSelect, handleUnselect, selected, trips }) => (
  <Pane display="flex" className="Trips">
    <Pane paddingRight={ITEM_HEIGHT}>
      <TripsTitle from={from} to={to} />
    </Pane>

    <Pane flexGrow={1}>
      <Item flexDirection="column" overflow="hidden">
        {trips.length === 0 && (
          <>
            <Icon icon="info-sign" color="info" marginBottom={minorScale(1)} />
            <Paragraph>There is no trip matching your research</Paragraph>
          </>
        )}

        {trips.map((trip, i) => {
          const { id } = trip;
          const isSelected = trip.id === selected;
          const isNotSelected = selected && !isSelected;
          const isLast = i + 1 === trips.length;
          const _handleSelect = () => handleSelect(trip);

          return (
            <Ticket
              {...trip}
              key={id}
              handleSelect={_handleSelect}
              handleUnselect={handleUnselect}
              hasBorder={!isLast}
              isSelected={isSelected}
              isNotSelected={isNotSelected}
            />
          );
        })}
      </Item>
    </Pane>
  </Pane>
);

Trips.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
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
