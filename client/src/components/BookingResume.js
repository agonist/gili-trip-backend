import React from "react";
import PropTypes from "prop-types";
import { FormField, Heading } from "evergreen-ui";

import Item from "./Item";
import TicketsTable from "./TicketsTable";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const headingProps = {
  size: 600,
  textAlign: "left",
  marginTop: ITEM_HEIGHT,
  marginBottom: ITEM_SPACE,
};

const formFieldProps = {
  marginBottom: ITEM_SPACE / 2,
};

const itemProps = {
  flexDirection: "column",
  alignItems: "baseline",
};

const formatTicket = ({ trip, ...ticket }) => ({
  ...ticket,
  ...trip,
});

const formatTickets = tickets => tickets.map(formatTicket);

const BookingResume = ({
  booking_email,
  final_price,
  passengers,
  quantity,
  tickets,
}) => (
  <div className="BookingResume">
    <TicketsTable
      tickets={formatTickets(tickets)}
      quantity={quantity}
      final_price={final_price}
    />

    <Heading {...headingProps}>Your informations</Heading>
    <Item {...itemProps}>
      <FormField
        {...formFieldProps}
        label="Email"
        description={booking_email}
      />
    </Item>

    <Heading {...headingProps}>Passengers</Heading>
    <Item {...itemProps}>
      {passengers.map((passenger, i) => (
        <FormField
          {...formFieldProps}
          key={passenger}
          label={`Passenger ${i + 1}`}
          description={passenger}
        />
      ))}
    </Item>
  </div>
);

BookingResume.propTypes = {
  final_price: PropTypes.string.isRequired,
  booking_email: PropTypes.string.isRequired,
  passengers: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantity: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default BookingResume;
