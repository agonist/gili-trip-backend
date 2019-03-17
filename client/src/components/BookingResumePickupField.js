import React from "react";
import PropTypes from "prop-types";
import { FormField } from "evergreen-ui";

const BookingResumePickupField = ({
  children,
  formFieldProps,
  ticket: { pickup_name, pickup_address, pickup_phone },
}) => (
  <>
    {children}

    {pickup_name && (
      <FormField
        {...formFieldProps}
        label="Hotel name"
        description={pickup_name}
      />
    )}

    {pickup_address && (
      <FormField
        {...formFieldProps}
        label="Hotel address"
        description={pickup_address}
      />
    )}

    {pickup_phone && (
      <FormField
        {...formFieldProps}
        label="Phone number"
        description={pickup_phone}
      />
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
