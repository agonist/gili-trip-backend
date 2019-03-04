import React from "react";
import PropTypes from "prop-types";
import { Button, Pane, majorScale } from "evergreen-ui";

import Content from "./TicketContent";
import Icons from "./TicketIcons";
import Item from "./Item";
import Price from "./Price";

const buttonHeight = 32;
const baseZindex = 10;

const pileItemProps = index => ({
  position: "absolute",
  bottom: `${0 - index * 7}%`,
  left: `${index * 2}%`,
  right: `${index * 2}%`,
  margin: 0,
  zIndex: baseZindex - index * 10,
});

const Ticket = ({
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
      onClick={isSelected ? handleUnselect : null}
    >
      <Content
        arrival_time={arrival_time}
        departure_time={departure_time}
        duration={duration}
      />

      {canSelectTicket && (
        <Pane
          width="30%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Price price={price} currency={currency} />

          <Pane height={buttonHeight} marginTop={majorScale(1)}>
            {isSelected ? (
              <Icons />
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

Ticket.propTypes = {
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

Ticket.defaultProps = {
  canSelectTicket: true,
  handleSelect: null,
  handleUnselect: null,
  isSelected: false,
};

export default Ticket;
