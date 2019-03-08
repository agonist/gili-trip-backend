import React from "react";
import PropTypes from "prop-types";
import { FormField, Heading } from "evergreen-ui";

import Item from "./Item";
import TicketsTable from "./TicketsTable";
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
  quantity,
  tickets,
}) => (
  <div className="BookingResume">
    <TicketsTable tickets={tickets} quantity={quantity} />

    <Heading {...headingProps}>Your informations</Heading>
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

      <Heading {...headingProps}>Passengers</Heading>
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
  booking_email: PropTypes.string.isRequired,
  booking_whatsapp: PropTypes.string,
  passengers: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantity: PropTypes.number.isRequired,
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
