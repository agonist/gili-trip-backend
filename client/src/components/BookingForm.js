import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Button, Checkbox, Heading, Pane, TextInputField } from "evergreen-ui";

import Item from "./Item";
import TicketContent from "./TicketContent";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { composeValidators } from "../helpers";

const mustMatch = valueToMatch => value =>
  value === valueToMatch ? undefined : true;

const renderSeparator = () => <Pane width={ITEM_HEIGHT} />;
const required = value => (value ? undefined : "Required");

const headingProps = {
  size: 700,
  textAlign: "left",
  marginTop: ITEM_HEIGHT,
  marginBottom: ITEM_SPACE,
};

const renderPassengerField = index => (
  <Field key={index} name={`passenger[${index}]`} validate={required}>
    {({ input, meta }) => (
      <TextInputField
        {...input}
        required
        label={`Passenger ${index + 1}`}
        placeholder="hello@gili.com"
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

const renderOptionalField = (ticket, path) => (
  <Item
    flexDirection="column"
    paddingX={0}
    paddingBottom={ITEM_SPACE}
    marginBottom={ITEM_HEIGHT}
  >
    <TicketContent {...ticket} />

    <Pane
      width="100%"
      height={1}
      backgroundColor="#425A70"
      opacity={0.2}
      marginY={ITEM_HEIGHT}
    />

    <Pane width="100%" paddingX={ITEM_HEIGHT}>
      <Pane display="flex">
        <Field name={`${path}.pickup_name`}>
          {({ input }) => (
            <TextInputField
              {...input}
              label="Hostel"
              placeholder="Hostel name"
              width="100%"
            />
          )}
        </Field>

        {renderSeparator()}

        <Field name={`${path}.pickup_room_number`}>
          {({ input }) => (
            <TextInputField
              {...input}
              label="Room number"
              placeholder="42"
              width="100%"
            />
          )}
        </Field>
      </Pane>

      <Pane display="flex">
        <Field name={`${path}.pickup_city`}>
          {({ input }) => (
            <TextInputField
              {...input}
              label="City"
              placeholder="Bali"
              width="100%"
            />
          )}
        </Field>

        {renderSeparator()}

        <Field name={`${path}.pickup_address`}>
          {({ input }) => (
            <TextInputField
              {...input}
              label="Address"
              placeholder="Hotel address"
              width="100%"
            />
          )}
        </Field>
      </Pane>
    </Pane>
  </Item>
);

const BookingForm = ({ initialValues, tickets, onSubmit }) => {
  const { departure: departureTicket, return: returnTicket } = tickets;

  const [withPickup, setWithPickup] = React.useState(false);
  const [withDropoff, setWithDropoff] = React.useState(false);

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
          <Heading {...headingProps}>Email</Heading>

          <Item flexDirection="column">
            <Field name="booking_email" validate={required}>
              {({ input, meta }) => (
                <TextInputField
                  {...input}
                  required
                  label="Email"
                  placeholder="hello@gili.com"
                  type="email"
                  width="100%"
                  isInvalid={meta.error && meta.touched}
                />
              )}
            </Field>

            <Field
              name="booking_email_confirm"
              validate={composeValidators(required, mustMatch(booking_email))}
            >
              {({ input, meta }) => (
                <TextInputField
                  {...input}
                  required
                  label="Confirm email"
                  placeholder="hello@gili.com"
                  type="email"
                  width="100%"
                  isInvalid={meta.error && meta.touched}
                />
              )}
            </Field>

            <Field name="booking_whatsapp">
              {({ input, meta }) => (
                <TextInputField
                  {...input}
                  label="Phone number"
                  placeholder="+33 6 06 06 06 06"
                  type="tel"
                  width="100%"
                  isInvalid={meta.error && meta.touched}
                />
              )}
            </Field>
          </Item>

          <Heading {...headingProps}>Passengers</Heading>

          <Item flexDirection="column">
            <Pane display="flex" width="100%" flexWrap="wrap">
              {renderPassengersField(quantity)}
            </Pane>
          </Item>

          <Heading {...headingProps}>Optional</Heading>

          <Checkbox
            label={`I need a pickup from ${departureTicket.from.name}`}
            checked={withPickup}
            onChange={handleWithPickupChange}
          />

          {withPickup &&
            renderOptionalField(departureTicket, "tickets.departure")}

          {returnTicket && (
            <React.Fragment>
              <Checkbox
                label={`I need a  dropoff ${returnTicket.from.name}`}
                checked={withDropoff}
                onChange={handleWithDropoffChange}
              />

              {withDropoff &&
                renderOptionalField(returnTicket, "tickets.return")}
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
    return: PropTypes.shape({}).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

BookingForm.defaultProps = {
  initialValues: {},
};

export default BookingForm;
