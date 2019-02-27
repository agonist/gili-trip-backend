import React from "react";
import PropTypes from "prop-types";
import { FormField, Heading, Pane } from "evergreen-ui";

import Item from "./Item";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const DEFAULT_VALUE = "N/A";

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

const withDefaultValue = value => value || DEFAULT_VALUE;

const BookingResume = ({
  booking_email,
  booking_whatsapp,
  passengers,
  tickets,
}) => (
  <div className="BookingResume">
    <Heading {...headingProps}>Contact</Heading>
    <Item {...itemProps}>
      <FormField
        {...formFieldProps}
        label="Email"
        description={withDefaultValue(booking_email)}
      />
      <FormField
        {...formFieldProps}
        marginBottom={0}
        label="Phone number"
        description={withDefaultValue(booking_whatsapp)}
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

    {tickets.map(({ id, trip }) => (
      <Pane key={id}>
        <Heading {...headingProps}>{trip.name}</Heading>
        <Item {...itemProps}>
          <FormField
            {...formFieldProps}
            label="Departure at"
            description={trip.departure_time}
          />

          <FormField
            {...formFieldProps}
            label="Arrival at"
            description={trip.arrival_time}
          />
        </Item>
      </Pane>
    ))}
  </div>
);

BookingResume.propTypes = {
  booking_email: PropTypes.string.isRequired,
  booking_whatsapp: PropTypes.string,
  passengers: PropTypes.arrayOf(PropTypes.string).isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      trip: PropTypes.shape({
        departure_time: PropTypes.string.isRequired,
        arrival_time: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

BookingResume.defaultProps = {
  booking_whatsapp: null,
};

export default BookingResume;
