import React from "react";
import { Form, Field } from "react-final-form";

import {
  Button,
  Heading,
  Pane,
  TextInputField,
  majorScale,
} from "evergreen-ui";

const itemHeight = majorScale(5);

const required = value => (value ? undefined : "Required");

const Separator = <Pane width={majorScale(5)} />;

const BookingForm = () => (
  <Form onSubmit={console.log}>
    {({ form, handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
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

        <Field name="booking_email_confirm" validate={required}>
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

        <Pane display="flex">
          <Field name="passenger_1" validate={required}>
            {({ input, meta }) => (
              <TextInputField
                {...input}
                required
                label="Passenger 1"
                placeholder="hello@gili.com"
                width="100%"
                isInvalid={meta.error && meta.touched}
              />
            )}
          </Field>

          {Separator}

          <Field name="passenger_2" validate={required}>
            {({ input }) => (
              <TextInputField
                {...input}
                label="Passenger 2"
                placeholder="hello@gili.com"
                width="100%"
              />
            )}
          </Field>
        </Pane>

        <Pane display="flex">
          <Field name="passenger_3" validate={required}>
            {({ input }) => (
              <TextInputField
                {...input}
                label="Passenger 3"
                placeholder="hello@gili.com"
                width="100%"
              />
            )}
          </Field>

          {Separator}

          <Field name="passenger_4" validate={required}>
            {({ input }) => (
              <TextInputField
                {...input}
                label="Passenger 3"
                placeholder="hello@gili.com"
                width="100%"
              />
            )}
          </Field>
        </Pane>

        <Heading size={600} textAlign="left" marginBottom={majorScale(2)}>
          Optional
        </Heading>

        <Pane display="flex">
          <Field name="pickup_name" validate={required}>
            {({ input }) => (
              <TextInputField
                {...input}
                label="Hostel"
                placeholder="Hostel name"
                width="100%"
              />
            )}
          </Field>

          {Separator}

          <Field name="pickup_room_number" validate={required}>
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
          <Field name="pickup_city" validate={required}>
            {({ input }) => (
              <TextInputField
                {...input}
                label="City"
                placeholder="Bali"
                width="100%"
              />
            )}
          </Field>

          {Separator}

          <Field name="pickup_address" validate={required}>
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

        <Pane className="submit">
          <Button
            height={itemHeight}
            appearance="primary"
            disabled={pristine}
            isLoading={submitting}
            type="submit"
          >
            Save your informations
          </Button>
        </Pane>
      </form>
    )}
  </Form>
);

export default BookingForm;
