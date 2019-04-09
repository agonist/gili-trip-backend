import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormField, Heading } from "evergreen-ui";

import BookingResumePickupField from "./BookingResumePickupField";
import { ITEM_SPACE } from "../constants";
import { flattenTickets, hasPickup } from "../helpers";

const headingProps = {
  size: 500,
  marginBottom: ITEM_SPACE,
};

const formFieldProps = {
  marginBottom: ITEM_SPACE / 2,
};

const BookingResume = ({ booking_email, passengers, tickets }) => {
  const [departureTicket, returnTicket] = flattenTickets(tickets);
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

      {passengers.map((passenger, i) => (
        <FormField
          {...formFieldProps}
          key={passenger}
          label={`Passenger ${i + 1}`}
          description={passenger}
        />
      ))}

      {withPickup && (
        <BookingResumePickupField
          ticket={departureTicket}
          formFieldProps={formFieldProps}
        >
        <FormField
          label={`Pickup from ${departureTicket.from.name}`}
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
