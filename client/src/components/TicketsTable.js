import React from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import { Table, Text } from "evergreen-ui";

import { CURRENCY_SYMBOL, ITEM_SPACE } from "../constants";

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

const TicketsTable = ({
  final_price,
  full_price,
  quantity,
  tickets,
  ...props
}) => (
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
      <Table.TextHeaderCell {...mediumColProps}>Operator</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Quantity</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Price</Table.TextHeaderCell>
      <Table.TextHeaderCell {...smallColProps}>Subtotal</Table.TextHeaderCell>
    </Table.Head>

    <Table.Body>
      {tickets.map(({ id, trip_id, from, to, date, price, operator }) => (
        <Table.Row key={id || trip_id} {...rowProps}>
          <Table.TextCell flexGrow={1}>
            {`${from.name} -> ${to.name}`}
            <br />
            <strong>{dateFns.format(date, dateFormat)}</strong>
          </Table.TextCell>
          <Table.TextCell {...mediumColProps}>{operator.name}</Table.TextCell>
          <Table.TextCell {...smallColProps}>x{quantity}</Table.TextCell>
          <Table.TextCell {...smallColProps}>
            {`${price}${CURRENCY_SYMBOL}`}
          </Table.TextCell>
          <Table.TextCell {...smallColProps}>
            {`${price * quantity}${CURRENCY_SYMBOL}`}
          </Table.TextCell>
        </Table.Row>
      ))}

      <Table.Row {...rowProps}>
        <Table.TextCell textAlign="right">
          Total:
          {final_price !== full_price && (
            <span
              style={{
                display: "inline-block",
                textDecoration: "line-through",
                margin: "0 4px",
              }}
            >
              {full_price}
              {CURRENCY_SYMBOL}
            </span>
          )}
          <Text>
            <strong>
              {final_price}
              {CURRENCY_SYMBOL}
            </strong>
          </Text>
        </Table.TextCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

TicketsTable.propTypes = {
  final_price: PropTypes.string.isRequired,
  full_price: PropTypes.string.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default TicketsTable;
