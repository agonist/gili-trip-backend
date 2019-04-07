import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormField, Heading } from "evergreen-ui";

import BookingResumePickupField from "./BookingResumePickupField";
import { ITEM_SPACE } from "../constants";
import { formatTickets, hasPickup } from "../helpers";

const headingProps = {
  size: 500,
  marginBottom: ITEM_SPACE,
};

const formFieldProps = {
  marginBottom: ITEM_SPACE / 2,
};

const BookingResume = ({ booking_email, passengers, tickets }) => {
  const [departureTicket, returnTicket] = formatTickets(tickets);
  const withPickup = hasPickup(departureTicket);
  const withDropoff = hasPickup(returnTicket);

  return (
    <div className="BookingResume">
      <Heading {...headingProps}>Your informations</Heading>

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

      {passengers.map((passenger, i) => (
        <FormField
          {...formFieldProps}
          key={passenger}
          label={`Passenger ${i + 1}`}
          description={passenger}
        />
      ))}
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
