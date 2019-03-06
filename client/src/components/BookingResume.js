import React from "react";
import PropTypes from "prop-types";
import { FormField, Heading, Pane } from "evergreen-ui";
import { Table } from "evergreen-ui";

import Container from "./Container";
import Item from "./Item";
import Price from "./Price";
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

  {/* START OF UGLY BASTIEN STUFF */}
  <br/>

  <Table>
    <Table.Head>
      <Table.TextHeaderCell >Your tickets</Table.TextHeaderCell >
      <Table.TextHeaderCell >Quantity</Table.TextHeaderCell >
      <Table.TextHeaderCell>Price</Table.TextHeaderCell>
      <Table.TextHeaderCell>Subtotal</Table.TextHeaderCell>
    </Table.Head>
    <Table.Body height={240}>
    <Table.Row height="auto" paddingY={12}>
        <Table.TextCell>Wahana Gili Ocean <br />Bali (Pandang bai) to Gili Trawangan<br /><b>Monday 12 march 2019 at 10:00am</b></Table.TextCell>
        <Table.TextCell>x2</Table.TextCell>
        <Table.TextCell>32$</Table.TextCell>
        <Table.TextCell>64$</Table.TextCell>
      </Table.Row>
      <Table.Row height="auto" paddingY={12}>
          <Table.TextCell>Wahana Gili Ocean <br />Gili Trawangan to Bali (Pandang bai)<br /><b>Monday 16 march 2019 at 10:00am</b></Table.TextCell>
          <Table.TextCell>x2</Table.TextCell>
          <Table.TextCell>32$</Table.TextCell>
          <Table.TextCell>64$</Table.TextCell>
        </Table.Row>
        <Table.Row height="auto" paddingY={12}>
            <Table.TextCell></Table.TextCell>
            <Table.TextCell></Table.TextCell>
            <Table.TextCell></Table.TextCell>
            <Table.TextCell>Total to pay 128$</Table.TextCell>
          </Table.Row>
    </Table.Body>
  </Table>

  {/* END OF UGLY BASTIEN STUFF */}

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
