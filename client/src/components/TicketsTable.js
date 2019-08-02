import React from "react";
import PropTypes from "prop-types";

import { Badge, Pane, Table, Text } from "evergreen-ui";

import Item from "./Item";
import Price from "./Price";
import TicketsTableRow from "./TicketsTableRow";

import { hasOpenReturn } from "../helpers";
import { ITEM_SPACE } from "../constants";

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
  booking_type,
  final_price,
  full_price,
  quantity,
  tickets,
  coupon,
  ...props
}) => {
  return (
    <Item padding={0} overflow="hidden" {...props}>
      <Table width="100%" backgroundColor="#fff">
        <Table.Head
          paddingX={rowProps.padding}
          paddingY={rowProps.padding * 1.5}
        >
          <Table.TextHeaderCell flexGrow={1}>Your tickets</Table.TextHeaderCell>
          <Table.TextHeaderCell {...mediumColProps}>
            Operator
          </Table.TextHeaderCell>
          <Table.TextHeaderCell {...smallColProps}>
            Quantity
          </Table.TextHeaderCell>
          <Table.TextHeaderCell {...smallColProps}>Price</Table.TextHeaderCell>
          <Table.TextHeaderCell {...smallColProps}>
            Subtotal
          </Table.TextHeaderCell>
        </Table.Head>

        <Table.Body>
          {tickets.map(ticket => (
            <TicketsTableRow
              key={ticket.id || ticket.trip_id}
              {...ticket}
              quantity={quantity}
            />
          ))}

          {hasOpenReturn(booking_type) && (
            <TicketsTableRow {...tickets[0]} quantity={quantity} isOpenReturn />
          )}

          <Table.Row {...rowProps}>
            <Table.TextCell textAlign="right">
              <Pane>
                Total:{" "}
                {final_price !== full_price && (
                  <span
                    style={{
                      display: "inline-block",
                      textDecoration: "line-through",
                      margin: "0 4px",
                    }}
                  >
                    <Price value={full_price} />
                  </span>
                )}
                <Text>
                  <strong>
                    <Price value={final_price} />
                  </strong>
                </Text>
              </Pane>

              {coupon && (
                <Badge color="green" isSolid marginTop={4}>
                  {coupon.code}
                </Badge>
              )}
            </Table.TextCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Item>
  );
};

TicketsTable.propTypes = {
  booking_type: PropTypes.string.isRequired,
  final_price: PropTypes.string.isRequired,
  full_price: PropTypes.string.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  quantity: PropTypes.number.isRequired,
  coupon: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }),
};

TicketsTable.defaultProps = {
  coupon: null,
};

export default TicketsTable;
