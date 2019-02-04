import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Icon, Pane, majorScale } from "evergreen-ui";

import Duration from "../Duration";
import Item from "../Item";
import Time from "../Time";

const buttonHeight = 32;

const TripItem = ({
  arrival_date,
  currency,
  departure_date,
  duration,
  handleSelect,
  isSelected,
  price,
  canSelectTicket,
}) => (
  <Item>
    <Pane flexGrow={1} alignItems="center" justifyContent="center">
      <Pane display="flex" alignItems="center" justifyContent="center">
        <Pane textAlign="right">
          <Time title="Departure" date={departure_date} />
        </Pane>

        <Duration duration={duration} />

        <Pane textAlign="left">
          <Time title="Arrival" date={arrival_date} />
        </Pane>
      </Pane>
    </Pane>

    {canSelectTicket && (
      <Pane
        width="30%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading size={700} textAlign="center" fontWeight={600}>
          {price} {currency}
        </Heading>

        <Pane height={buttonHeight} marginTop={majorScale(1)}>
          {isSelected ? (
            <Icon
              icon="tick-circle"
              color="success"
              size={majorScale(3)}
              marginLeft={majorScale(1)}
            />
          ) : (
            <Button appearance="primary" onClick={handleSelect}>
              Reserve a ticket
            </Button>
          )}
        </Pane>
      </Pane>
    )}
  </Item>
);

TripItem.propTypes = {
  arrival_date: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  departure_date: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  canSelectTicket: PropTypes.bool,
};

TripItem.defaultProps = {
  canSelectTicket: true,
  handleSelect: null,
  isSelected: false,
};

export default TripItem;
