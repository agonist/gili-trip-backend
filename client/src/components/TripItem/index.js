import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Icon, Pane, majorScale } from "evergreen-ui";

import Duration from "../Duration";
import Item from "../Item";
import Time from "../Time";

import "./index.css";

const buttonHeight = 32;
const baseZindex = 100;
const iconSize = majorScale(3);

const pileItemProps = index => ({
  position: "absolute",
  bottom: `${0 - index * 7}%`,
  left: `${index * 2}%`,
  right: `${index * 2}%`,
  margin: 0,
  zIndex: baseZindex - index * 10,
});

const TripItem = ({
  arrival_time,
  currency,
  departure_time,
  duration,
  handleSelect,
  handleUnselect,
  isSelected,
  price,
  canSelectTicket,
}) => (
  <Pane position="relative">
    <Item
      className={`Ticket ${isSelected && "is-selected"}`}
      position="relative"
      zIndex={baseZindex}
      cursor={isSelected ? "pointer" : "default"}
      onClick={isSelected && handleUnselect}
    >
      <Pane flexGrow={1} alignItems="center" justifyContent="center">
        <Pane display="flex" alignItems="center" justifyContent="center">
          <Pane textAlign="right">
            <Time title="Departure" value={departure_time} />
          </Pane>

          <Duration duration={duration} />

          <Pane textAlign="left">
            <Time title="Arrival" value={arrival_time} />
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
              <Pane className="Ticket-icons" width={iconSize} height={iconSize}>
                <span className="Ticket-icon Ticket-icon--circle">
                  <Icon size={iconSize} icon="tick-circle" color="success" />
                </span>
                <span className="Ticket-icon Ticket-icon--ban">
                  <Icon size={iconSize} icon="ban-circle" color="danger" />
                </span>
              </Pane>
            ) : (
              <Button appearance="primary" onClick={handleSelect}>
                Reserve a ticket
              </Button>
            )}
          </Pane>
        </Pane>
      )}
    </Item>

    {isSelected &&
      [1, 2].map(value => (
        <Item
          key={value}
          style={{
            ...pileItemProps(value),
          }}
        />
      ))}
  </Pane>
);

TripItem.propTypes = {
  arrival_time: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  departure_time: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  handleUnselect: PropTypes.func,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  canSelectTicket: PropTypes.bool,
};

TripItem.defaultProps = {
  canSelectTicket: true,
  handleSelect: null,
  handleUnselect: null,
  isSelected: false,
};

export default TripItem;
