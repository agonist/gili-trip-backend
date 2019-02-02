import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Icon, Pane, Text, majorScale } from "evergreen-ui";
import dateFns from "date-fns";

import Item from "../Item";
import { convertMinsToHrsMins } from "../../helpers";

const lightColor = "#1070CA";

const locationItemProps = {
  width: "30%",
};

const renderDate = (date, name) => (
  <React.Fragment>
    <Heading marginBottom="0.3rem" size={700} fontWeight={400}>
      {dateFns.format(date, "hh:mm")}
    </Heading>

    <Text>{name}</Text>
  </React.Fragment>
);

const renderDuration = (duration, direction) => (
  <Pane
    paddingX={majorScale(4)}
    display="flex"
    justifyContent="center"
    flexDirection="column"
  >
    <Text textAlign="center" color={lightColor}>
      {convertMinsToHrsMins(duration, "h")}
    </Text>

    <Pane display="flex" alignItems="center" justifyContent="center">
      {direction === "from" ? (
        <React.Fragment>
          <Pane
            width="3rem"
            height={2}
            backgroundColor={lightColor}
            display="inline-block"
            marginRight={-2}
          />
          <Icon icon="arrow-right" color={lightColor} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Icon icon="arrow-left" color={lightColor} />
          <Pane
            width="3rem"
            height={2}
            backgroundColor={lightColor}
            display="inline-block"
            marginLeft={-2}
          />
        </React.Fragment>
      )}
    </Pane>
  </Pane>
);

const TripItem = ({
  arrival_date,
  currency,
  departure_date,
  duration,
  from,
  handleSelectTicket,
  price,
  to,
  canSelectTicket,
}) => (
  <Item>
    <Pane flexGrow={1} alignItems="center" justifyContent="center">
      <Pane display="flex" alignItems="center" justifyContent="center">
        <Pane textAlign="right" {...locationItemProps}>
          {renderDate(departure_date, from.name)}
        </Pane>
        {renderDuration(duration, "from")}
        <Pane textAlign="left" {...locationItemProps}>
          {renderDate(arrival_date, to.name)}
        </Pane>
      </Pane>

      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={majorScale(2)}
      >
        <Pane textAlign="right" {...locationItemProps}>
          {renderDate(arrival_date, to.name)}
        </Pane>
        {renderDuration(duration, "to")}
        <Pane textAlign="left" {...locationItemProps}>
          {renderDate(departure_date, from.name)}
        </Pane>
      </Pane>
    </Pane>

    {canSelectTicket && (
      <Pane display="flex" flexDirection="column" justifyContent="center">
        <Heading
          size={700}
          textAlign="center"
          marginBottom="0.5rem"
          fontWeight={600}
        >
          {price} {currency}
        </Heading>
        <Button appearance="primary" onClick={handleSelectTicket}>
          Select ticket
        </Button>
      </Pane>
    )}
  </Item>
);

TripItem.propTypes = {
  arrival_date: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  departure_date: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  from: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleSelectTicket: PropTypes.func,
  price: PropTypes.string.isRequired,
  to: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  canSelectTicket: PropTypes.bool,
};

TripItem.defaultProps = {
  canSelectTicket: true,
  handleSelectTicket: null,
};

export default TripItem;
