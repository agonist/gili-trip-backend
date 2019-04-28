import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane, Paragraph } from "evergreen-ui";

import OperatorLogo from "./OperatorLogo";

import { convertMinsToHrsMins } from "../helpers";
import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const headingProps = {
  flexGrow: 1,
  size: 600,
  fontWeight: 400,
  textAlign: "center",
};

const Ticket = ({
  arrival_time,
  departure_time,
  duration,
  handleSelect,
  hasBorder,
  isSelected,
  isNotSelected,
  price,
  vehicle,
}) => {
  const formattedDuration = convertMinsToHrsMins(duration, "h");

  return (
    <Pane
      className="Ticket"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      paddingX={ITEM_HEIGHT}
      paddingY={ITEM_SPACE * 1.5}
      borderBottom={hasBorder ? "1px solid #E4E7EB" : "none"}
      onClick={handleSelect}
      cursor="pointer"
      opacity={isNotSelected ? 0.4 : 1}
      transition="opacity .2s ease-out"
    >
      <OperatorLogo {...vehicle} />

      <Heading {...headingProps}>
        {departure_time} - {arrival_time}
        <Paragraph color="#66788A">{formattedDuration}</Paragraph>
      </Heading>

      <Heading {...headingProps}>{`${price}${CURRENCY_SYMBOL}`}</Heading>

      <Icon
        icon={isSelected ? "tick-circle" : "chevron-right"}
        color={isSelected ? "success" : "muted"}
        transition="all .2s ease-out"
      />
    </Pane>
  );
};

Ticket.propTypes = {
  arrival_time: PropTypes.string.isRequired,
  departure_time: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  hasBorder: PropTypes.bool,
  isSelected: PropTypes.bool,
  isNotSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  vehicle: PropTypes.shape({}).isRequired,
};

Ticket.defaultProps = {
  handleSelect: null,
  hasBorder: false,
  isSelected: false,
  isNotSelected: false,
};

export default Ticket;
