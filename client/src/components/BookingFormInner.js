import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Checkbox, Heading, Pane, TextInputField } from "evergreen-ui";

import BookingFormOptionalField from "./BookingFormOptionalField";
import { formValidations, hasPickup } from "../helpers";

const { required } = formValidations;

const renderPassengerField = index => (
  <Field key={index} name={`passengers[${index}]`} validate={required}>
    {({ input, meta }) => (
      <TextInputField
        {...input}
        required
        label={`Passenger ${index + 1}`}
        placeholder={`Passenger ${index + 1} fullname`}
        width="100%"
        isInvalid={meta.error && meta.touched}
      />
    )}
  </Field>
);

const renderPassengersField = count => {
  const fields = [];

  for (let index = 0; index < count; index += 1) {
    fields.push(renderPassengerField(index));
  }

  return fields;
};

const BookingFormInner = ({ quantity, tickets }) => {
  const [departureTicket, returnTicket] = tickets;

  const defaultHasPickup = hasPickup(tickets[0]);
  const defaultHasDropoff = hasPickup(tickets[1]);

  const [withPickup, setWithPickup] = React.useState(defaultHasPickup);
  const [withDropoff, setWithDropoff] = React.useState(defaultHasDropoff);

  const handleWithPickupChange = () => setWithPickup(!withPickup);
  const handleWithDropoffChange = () => setWithDropoff(!withDropoff);

  return (
    <>
      <Field name="booking_email" validate={required}>
        {({ input, meta }) => (
          <TextInputField
            {...input}
            required
            label="Email"
            placeholder="your@email.com"
            hint="We will send your tickets here"
            type="email"
            width="100%"
            isInvalid={meta.error && meta.touched}
          />
        )}
      </Field>

      <Pane display="flex" width="100%" flexWrap="wrap">
        {renderPassengersField(quantity)}
      </Pane>

      <Heading size={600}>Optional</Heading>

      <BookingFormOptionalField path="tickets[0]" isShown={withPickup}>
        <Checkbox
          label={`I need a pickup from ${departureTicket.from.name}`}
          checked={withPickup}
          onChange={handleWithPickupChange}
          marginBottom={0}
        />
      </BookingFormOptionalField>

      {returnTicket && (
        <BookingFormOptionalField path="tickets[1]" isShown={withDropoff}>
          <Checkbox
            label={`I need a dropoff in ${returnTicket.from.name}`}
            checked={withDropoff}
            onChange={handleWithDropoffChange}
            marginBottom={0}
          />
        </BookingFormOptionalField>
      )}
    </>
  );
};

BookingFormInner.propTypes = {
  quantity: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default BookingFormInner;
