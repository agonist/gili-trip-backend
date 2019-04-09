import React from "react";
import PropTypes from "prop-types";
import { FormField, Text } from "evergreen-ui";

const BookingResumePickupField = ({
  children,
  formFieldProps,
  ticket: { pickup_name, pickup_address, pickup_phone },
}) => (
  <>
    {children}


    {pickup_name && (

      <Text>
        {`${pickup_name}`}
      </Text>
    )}
    <br/>
    {pickup_address && (
      <Text>
      {`${pickup_address}`}
      </Text>
    )}
    <br/>
    {pickup_phone && (
      <Text>
      {`${pickup_phone}`}
      </Text>
    )}
  </>
);

BookingResumePickupField.propTypes = {
  children: PropTypes.node.isRequired,
  formFieldProps: PropTypes.shape({}),
  ticket: PropTypes.shape({}).isRequired,
};

BookingResumePickupField.defaultProps = {
  formFieldProps: {},
};

export default BookingResumePickupField;
