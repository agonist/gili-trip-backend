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
  flexBasis: 80,
  flexShrink: 0,
  flexGrow: 0,
  textAlign: "center",
  padding: 0,
};

const mediumColProps = {
  ...smallColProps,
  flexBasis: 200,
};

const calculateFinalPrice = tickets =>
  tickets.reduce((total, ticket) => total + Number(ticket.price), 0);

const TicketsTable = ({ final_price, quantity, tickets, ...props }) => (
  <Table
    width="100%"
    backgroundColor="#fff"
    borderTop="1px solid #E4E7EB"
    borderLeft="1px solid #E4E7EB"
    borderRight="1px solid #E4E7EB"
    {...props}
  >
    <Table.Head paddingX={rowProps.padding} paddingY={rowProps.padding * 1.5}>
      <Table.TextHeaderCell flexGrow={1}>Your tickets</Table.TextHeaderCell>
      <Table.TextHeaderCell {...mediumColProps}>Vehicle</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Quantity</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Price</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Subtotal</Table.TextHeaderCell>
    </Table.Head>

    <Table.Body>
      {tickets.map(
        ({ id, trip_id, from, to, date, currency, price, vehicle }) => (
          <Table.Row key={id || trip_id} {...rowProps}>
            <Table.TextCell flexGrow={1}>
              {`${from.name} -> ${to.name}`}
              <br />
              <strong>{dateFns.format(date, dateFormat)}</strong>
            </Table.TextCell>
            <Table.TextCell {...mediumColProps}>
              {vehicle.kind}
              <br />
              <strong>{vehicle.subtype}</strong>
            </Table.TextCell>
            <Table.TextCell {...smallColProps}>x{quantity}</Table.TextCell>
            <Table.TextCell {...smallColProps}>
              {`${price} ${currency}`}
            </Table.TextCell>
            <Table.TextCell {...smallColProps}>
              {`${price * quantity}${currency}`}
            </Table.TextCell>
          </Table.Row>
        ),
      )}

      <Table.Row {...rowProps}>
        <Table.TextCell flexGrow={1} />
        <Table.TextCell {...smallColProps}>
          Total: <strong>{final_price || calculateFinalPrice(tickets)}$</strong>
        </Table.TextCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

TicketsTable.propTypes = {
  final_price: PropTypes.string,
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  quantity: PropTypes.number.isRequired,
};

TicketsTable.defaultProps = {
  final_price: undefined,
};

export default TicketsTable;
