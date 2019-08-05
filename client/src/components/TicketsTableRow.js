import React from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import { Table } from "evergreen-ui";

import Price from "./Price";

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

const TicketsTableRow = ({
  id,
  trip_id,
  from,
  to,
  date,
  price,
  operator,
  quantity,
  isOpenReturn,
}) => (
  <Table.Row key={id || trip_id} {...rowProps}>
    <Table.TextCell flexGrow={1}>
      {`${from.name} -> ${to.name}`}
      <br />
      <strong>
        {isOpenReturn
          ? "Date to comfirm with the boat company"
          : dateFns.format(date, dateFormat)}
      </strong>
    </Table.TextCell>
    <Table.TextCell {...mediumColProps}>
      {operator.name}
    </Table.TextCell>
    <Table.TextCell {...smallColProps}>x{quantity}</Table.TextCell>
    <Table.TextCell {...smallColProps}>
      <Price value={price} />
    </Table.TextCell>
    <Table.TextCell {...smallColProps}>
      <Price value={price * quantity} />
    </Table.TextCell>
  </Table.Row>
);

TicketsTableRow.propTypes = {
  id: PropTypes.string,
  trip_id: PropTypes.number,
  from: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  operator: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  isOpenReturn: PropTypes.bool,
};

TicketsTableRow.defaultProps = {
  id: undefined,
  trip_id: undefined,
  isOpenReturn: false,
};

export default TicketsTableRow;
