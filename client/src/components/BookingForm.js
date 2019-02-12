import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";

import {
  Button,
  Heading,
  Pane,
  TextInputField,
  majorScale,
} from "evergreen-ui";

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

const BookingForm = ({ initialValues, tickets, onSubmit }) => (
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
        </Item>

        <Heading {...headingProps}>Passengers</Heading>
        <Item flexDirection="column">
          <Pane display="flex" width="100%" flexWrap="wrap">
            {renderPassengersField(quantity)}
          </Pane>
        </Item>

        <Heading {...headingProps}>Optional</Heading>
        {tickets.map((ticket, i) => {
          const formatName = str => `tickets[${i}].${str}`;
          return (
            <Item
              key={ticket.id}
              flexDirection="column"
              paddingX={0}
              paddingBottom={ITEM_SPACE}
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
                  <Field name={formatName("pickup_name")}>
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

                  <Field name={formatName("pickup_room_number")}>
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
                  <Field name={formatName("pickup_city")}>
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

                  <Field name={formatName("pickup_address")}>
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
        })}

        <Pane textAlign="right" paddingTop={majorScale(3)}>
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

BookingForm.propTypes = {
  initialValues: PropTypes.shape({}),
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

BookingForm.defaultProps = {
  initialValues: {},
};

export default BookingForm;
