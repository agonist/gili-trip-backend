import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Button, Checkbox, Heading, Pane, TextInputField } from "evergreen-ui";

import BookingFormOptionalField from "./BookingFormOptionalField";
import Item from "./Item";
import TripsTitle from "./TripsTitle";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { composeValidators } from "../helpers";

const mustMatch = valueToMatch => value =>
  value === valueToMatch ? undefined : true;

const required = value => (value ? undefined : "Required");

const headingProps = {
  size: 700,
  textAlign: "left",
  marginTop: ITEM_HEIGHT,
  marginBottom: ITEM_SPACE,
};

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

const hasPickup = ({
  pickup_name,
  pickup_room_number,
  pickup_city,
  pickup_address,
} = {}) =>
  !!pickup_name || !!pickup_room_number || !!pickup_city || !!pickup_address;

const BookingForm = ({ initialValues, tickets, onSubmit }) => {
  const { departure: departureTicket, return: returnTicket } = tickets;

  const defaultHasPickup = hasPickup(
    initialValues.tickets && initialValues.tickets.departure,
  );

  const defaultHasDropoff = hasPickup(
    initialValues.tickets && initialValues.tickets.return,
  );

  const [withPickup, setWithPickup] = React.useState(defaultHasPickup);
  const [withDropoff, setWithDropoff] = React.useState(defaultHasDropoff);

  const handleWithPickupChange = () => setWithPickup(!withPickup);
  const handleWithDropoffChange = () => setWithDropoff(!withDropoff);

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({
        form,
        handleSubmit,
        submitting,
        values: { booking_email, quantity },
      }) => (
        <form onSubmit={handleSubmit}>
          <Heading {...headingProps}>Fill your infos</Heading>

          <Item flexDirection="column">
            <Field name="booking_email" validate={required}>
              {({ input, meta }) => (
                <TextInputField
                  {...input}
                  required
                  label="Email"
                  placeholder="We will send you your tickets here"
                  type="email"
                  width="100%"
                  isInvalid={meta.error && meta.touched}
                />
              )}
            </Field>

            <Pane display="flex" width="100%" flexWrap="wrap">
              {renderPassengersField(quantity)}
            </Pane>
          </Item>


          <Heading {...headingProps}>Optional</Heading>

          <TripsTitle
            from={departureTicket.from.name}
            to={departureTicket.to.name}
            size={500}
          />

          <BookingFormOptionalField
            ticket={departureTicket}
            path="tickets.departure"
            isShown={withPickup}
          >
            <Checkbox
              label="I need a pickup"
              checked={withPickup}
              onChange={handleWithPickupChange}
            />
          </BookingFormOptionalField>

          {returnTicket && (
            <React.Fragment>
              <TripsTitle
                from={returnTicket.from.name}
                to={returnTicket.to.name}
                size={500}
              />

              <BookingFormOptionalField
                ticket={returnTicket}
                path="tickets.return"
                isShown={withDropoff}
              >
                <Checkbox
                  label="I need a dropoff"
                  checked={withDropoff}
                  onChange={handleWithDropoffChange}
                />
              </BookingFormOptionalField>
            </React.Fragment>
          )}

          <Pane textAlign="right">
            <Button
              appearance="primary"
              height={ITEM_HEIGHT}
              iconAfter="arrow-right"
              isLoading={submitting}
              type="submit"
            >
              Confirm and book tickets
            </Button>
          </Pane>
        </form>
      )}
    </Form>
  );
};

BookingForm.propTypes = {
  initialValues: PropTypes.shape({}),
  tickets: PropTypes.shape({
    departure: PropTypes.shape({}).isRequired,
    return: PropTypes.shape({}),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

BookingForm.defaultProps = {
  initialValues: {},
};

export default BookingForm;
