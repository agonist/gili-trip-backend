import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Icon, Pane } from "evergreen-ui";

import OperatorLogo from "./OperatorLogo";
import Small from "./Small";

import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const headingProps = {
  size: 600,
  fontWeight: 400,
  is: "p",
};

const containerProps = {
  paddingX: ITEM_HEIGHT,
  paddingY: ITEM_SPACE * 1.5,
};

const Ticket = ({
  arrival_time,
  departure_time,
  from,
  to,
  handleSelect,
  hasBorder,
  isSelected,
  price,
  vehicle,
  operator,
}) => (
  <Pane
    className="Ticket"
    display="flex"
    width="100%"
    borderBottom={hasBorder ? "1px solid #E4E7EB" : "none"}
  >
    <Pane
      {...containerProps}
      flexGrow={1}
      display="flex"
      alignItems="center"
      paddingRight={0}
    >
      <Pane display="flex" paddingRight={ITEM_SPACE}>
        <OperatorLogo {...vehicle} />
        <Heading {...headingProps} paddingLeft={ITEM_SPACE}>
          <Small>Operator</Small>
          {operator.name}
        </Heading>
      </Pane>

      <Pane flexGrow={1} display="flex" justifyContent="center">
        <Heading {...headingProps} textAlign="right">
          <Small>{from.name}</Small>
          {departure_time}
        </Heading>

        <Pane paddingX={ITEM_SPACE} alignSelf="flex-end">
          <Icon icon="arrow-right" />
        </Pane>

        <Heading {...headingProps}>
          <Small>{to.name}</Small>
          {arrival_time}
        </Heading>
      </Pane>
    </Pane>

    <Pane {...containerProps} textAlign="center" borderLeft="1px solid #E4E7EB">
      <Heading {...headingProps} fontWeight={600} marginBottom={ITEM_SPACE / 2}>
        {`${price}${CURRENCY_SYMBOL}`}
      </Heading>

      {isSelected ? (
        <Button iconAfter="tick" disabled>
          Selected
        </Button>
      ) : (
        <Button
          onClick={handleSelect}
          iconAfter="arrow-right"
          appearance="primary"
        >
          Select
        </Button>
      )}
    </Pane>
  </Pane>
);

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
  from: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  operator: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Ticket.defaultProps = {
  handleSelect: null,
  hasBorder: false,
  isSelected: false,
  isNotSelected: false,
};

export default Ticket;
