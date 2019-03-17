import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Pane, TextInputField } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const BookingFormOptionalField = ({ children, path, isShown, ...props }) => (
  <Pane width="100%" {...props}>
    {children}

    <Pane display={isShown ? "block" : "none"} paddingTop={ITEM_SPACE}>
      <Field name={`${path}.pickup_name`}>
        {({ input }) => (
          <TextInputField
            {...input}
            label="Name"
            placeholder="Hotel name"
            width="100%"
          />
        )}
      </Field>

      <Field name={`${path}.pickup_address`}>
        {({ input }) => (
          <TextInputField
            {...input}
            label="Address"
            placeholder="Hotel address"
            width="100%"
          />
        )}
      </Field>

      <Field name={`${path}.pickup_phone`}>
        {({ input }) => (
          <TextInputField
            {...input}
            label="Phone number"
            placeholder="00336..."
            width="100%"
            type="tel"
          />
        )}
      </Field>
    </Pane>
  </Pane>
);

BookingFormOptionalField.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
};

export default BookingFormOptionalField;
