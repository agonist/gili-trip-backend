import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane } from "evergreen-ui";

import Content from "./TicketContent";
// import Icons from "./TicketIcons";
import Item from "./Item";
import Price from "./Price";
import OperatorLogo from "./OperatorLogo";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const baseZindex = 10;

const pileItemProps = index => ({
  position: "absolute",
  bottom: `${0 - index * 5}%`,
  left: `${index * 2}%`,
  right: `${index * 2}%`,
  margin: 0,
  zIndex: baseZindex - index * 10,
});

const Ticket = ({
  arrival_time,
  departure_time,
  duration,
  handleSelect,
  handleUnselect,
  isSelected,
  price,
  canSelectTicket,
  vehicle,
}) => (
  <Pane position="relative">
    <Item
      className={`Ticket ${isSelected && "is-selected"}`}
      position="relative"
      padding={0}
      paddingLeft={ITEM_HEIGHT}
      overflow="hidden"
      zIndex={baseZindex}
      onClick={isSelected ? handleUnselect : null}
    >
      <OperatorLogo {...vehicle} />

      <Content
        arrival_time={arrival_time}
        departure_time={departure_time}
        duration={duration}
        paddingY={ITEM_HEIGHT}
      />

      {canSelectTicket && (
        <Pane
          alignSelf="normal"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#1070CA"
          cursor="pointer"
          onClick={handleSelect}
        >
          <Price price={price} paddingX={ITEM_HEIGHT} />

          <Icon
            icon={isSelected ? "cross" : "arrow-right"}
            color="#FFF"
            marginTop={ITEM_SPACE}
          />
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
  departure_time: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  handleUnselect: PropTypes.func,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  canSelectTicket: PropTypes.bool,
  vehicle: PropTypes.shape({}).isRequired,
};

Ticket.defaultProps = {
  canSelectTicket: true,
  handleSelect: null,
  handleUnselect: null,
  isSelected: false,
};

export default Ticket;
