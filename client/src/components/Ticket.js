import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import Content from "./TicketContent";
import Icons from "./TicketIcons";
import Item from "./Item";
import Price from "./Price";
import OperatorLogo from "./OperatorLogo";

import useHover from "../hooks/useHover";
import { ITEM_HEIGHT } from "../constants";

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
}) => {
  const [isHovering, hoveringProps] = useHover();
  return (
    <Pane position="relative">
      <Item
        className={`Ticket ${isSelected && "is-selected"}`}
        position="relative"
        padding={0}
        paddingLeft={ITEM_HEIGHT}
        overflow="hidden"
        zIndex={baseZindex}
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
            {...hoveringProps}
            position="relative"
            alignSelf="normal"
            backgroundColor={isSelected ? "#47B881" : "#3D8BD4"}
            cursor="pointer"
            onClick={isSelected ? handleUnselect : handleSelect}
            transition="background-color 0.2s ease-out"
          >
            <Price price={price} padding={ITEM_HEIGHT} />
            <Icons isHovering={isHovering} isSelected={isSelected} />
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
};

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
