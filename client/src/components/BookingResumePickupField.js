import React from "react";
import PropTypes from "prop-types";
import { Text } from "evergreen-ui";

const BookingResumePickupField = ({
  children,
  ticket: { pickup_name, pickup_address, pickup_phone },
}) => (
  <>
    {children}
    {pickup_name && <Text>{`${pickup_name}`}</Text>}
    <br />
    {pickup_address && <Text>{`${pickup_address}`}</Text>}
    <br />
    {pickup_phone && <Text>{`${pickup_phone}`}</Text>}
  </>
);

BookingResumePickupField.propTypes = {
  children: PropTypes.node.isRequired,
  ticket: PropTypes.shape({}).isRequired,
};

export default BookingResumePickupField;
