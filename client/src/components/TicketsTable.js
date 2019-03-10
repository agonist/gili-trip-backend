import React from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import { Table } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const dateFormat = "dddd DD MMMM YYYY [at] hh[:]mma";

const rowProps = {
  height: "auto",
  padding: ITEM_SPACE,
};

const smallColProps = {
  flexBasis: 120,
  flexShrink: 0,
  flexGrow: 0,
  textAlign: "center",
  padding: 0,
};

const TicketsTable = ({ tickets, ...props }) => (
  <Table
    width="100%"
    backgroundColor="#fff"
    borderTop="1px solid #E4E7EB"
    borderLeft="1px solid #E4E7EB"
    borderRight="1px solid #E4E7EB"
    {...props}
  >
    <Table.Head paddingX={rowProps.padding} paddingY={rowProps.padding * 1.5}>
      <Table.TextHeaderCell>Your tickets</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Quantity</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Price</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Subtotal</Table.TextHeaderCell>
    </Table.Head>

    <Table.Body>
      {tickets.map(({ id, trip_id, trip, from, to, date, currency, price }) => (
        <Table.Row key={id || trip_id} {...rowProps}>
          <Table.TextCell>
            {/* Wahana Gili Ocean <br /> */}
            {from ? from.name : trip.from.name} {"to"}{" "}
            {to ? to.name : trip.to.name}
            <br />
            <strong>{dateFns.format(date, dateFormat)}</strong>
          </Table.TextCell>
          <Table.TextCell {...smallColProps}>x2</Table.TextCell>
          <Table.TextCell {...smallColProps}>
            {price || trip.price} {currency || trip.currency}
          </Table.TextCell>
          <Table.TextCell {...smallColProps}>64$</Table.TextCell>
        </Table.Row>
      ))}

      <Table.Row {...rowProps}>
        <Table.TextCell flexGrow={1} />
        <Table.TextCell {...smallColProps}>
          Total: <strong>128$</strong>
        </Table.TextCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

TicketsTable.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default TicketsTable;
