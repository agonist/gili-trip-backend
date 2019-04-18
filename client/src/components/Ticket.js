import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import Content from "./TicketContent";
import Icons from "./TicketIcons";
import Price from "./Price";
import OperatorLogo from "./OperatorLogo";

import useHover from "../hooks/useHover";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const Ticket = ({
  arrival_time,
  departure_time,
  duration,
  handleSelect,
  handleUnselect,
  hasBorder,
  isSelected,
  price,
  canSelectTicket,
  vehicle,
}) => {
  const [isHovering, hoveringProps] = useHover();
  return (
    <Pane
      className="Ticket"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      borderBottom={hasBorder ? "1px solid #E4E7EB" : "none"}
    >
      <Pane
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingX={ITEM_SPACE}
      >
        <OperatorLogo {...vehicle} />

        <Content
          arrival_time={arrival_time}
          departure_time={departure_time}
          duration={duration}
          paddingY={ITEM_HEIGHT}
        />
      </Pane>

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
    </Pane>
  );
};

Ticket.propTypes = {
  arrival_time: PropTypes.string.isRequired,
  departure_time: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  handleUnselect: PropTypes.func,
  hasBorder: PropTypes.bool,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  canSelectTicket: PropTypes.bool,
  vehicle: PropTypes.shape({}).isRequired,
};

Ticket.defaultProps = {
  canSelectTicket: true,
  handleSelect: null,
  handleUnselect: null,
  hasBorder: false,
  isSelected: false,
};

export default Ticket;
