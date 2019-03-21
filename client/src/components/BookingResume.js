import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormField, Heading } from "evergreen-ui";

import BookingResumePickupField from "./BookingResumePickupField";
import Item from "./Item";
import TicketsTable from "./TicketsTable";
import { ITEM_SPACE } from "../constants";
import { formatTickets, hasPickup } from "../helpers";

const headingProps = {
  size: 500,
  textAlign: "left",
  marginTop: ITEM_SPACE,
  marginBottom: ITEM_SPACE,
};

const formFieldProps = {
  marginBottom: ITEM_SPACE / 2,
};

const itemProps = {
  flexDirection: "column",
  alignItems: "baseline",
};

const BookingResume = ({
  booking_email,
  final_price,
  passengers,
  quantity,
  tickets,
}) => {
  const [departureTicket, returnTicket] = formatTickets(tickets);
  const withPickup = hasPickup(departureTicket);
  const withDropoff = hasPickup(returnTicket);

  return (
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

        {withPickup && (
          <BookingResumePickupField
            ticket={departureTicket}
            formFieldProps={formFieldProps}
          >
            <Checkbox
              label={`I need a pickup from ${departureTicket.from.name}`}
              disabled
              checked={withPickup}
            />
          </BookingResumePickupField>
        )}

        {withDropoff && (
          <BookingResumePickupField
            ticket={returnTicket}
            formFieldProps={formFieldProps}
          >
            <Checkbox
              label={`I need a dropoff in ${returnTicket.from.name}`}
              disabled
              checked={withDropoff}
            />
          </BookingResumePickupField>
        )}
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
};

BookingResume.propTypes = {
  final_price: PropTypes.string.isRequired,
  booking_email: PropTypes.string.isRequired,
  passengers: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantity: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default BookingResume;
