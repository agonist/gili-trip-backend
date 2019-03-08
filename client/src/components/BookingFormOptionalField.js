import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Pane, TextInputField } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const BookingFormOptionalField = ({ children, path, isShown, ...props }) => (
  <Pane width="100%" {...props}>
    {children}

    <Pane display={isShown ? "flex" : "none"} paddingTop={ITEM_SPACE}>
      <Field name={`${path}.pickup_name`}>
        {({ input }) => (
          <TextInputField
            {...input}
            label="Hotel"
            placeholder="Hotel name"
            width="100%"
            marginRight={ITEM_SPACE}
          />
        )}
      </Field>

      <Field name={`${path}.pickup_room_number`}>
        {({ input }) => (
          <TextInputField
            {...input}
            label="Room number"
            placeholder="42"
            width="100%"
          />
        )}
      </Field>
    </Pane>

    <Pane display={isShown ? "flex" : "none"} paddingTop={ITEM_SPACE}>
      <Field name={`${path}.pickup_city`}>
        {({ input }) => (
          <TextInputField
            {...input}
            label="City"
            placeholder="Bali"
            width="100%"
            marginRight={ITEM_SPACE}
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
    </Pane>
  </Pane>
);

BookingFormOptionalField.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
};

export default BookingFormOptionalField;
