import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Pane, TextInputField } from "evergreen-ui";

import Item from "./Item";
import TicketContent from "./TicketContent";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const BookingFormOptionalField = ({ children, ticket, path, isShown }) => (
  <Item
    flexDirection="column"
    paddingX={0}
    paddingBottom={ITEM_SPACE}
    marginBottom={ITEM_HEIGHT}
  >
    <TicketContent {...ticket} />

    <Pane
      width="100%"
      height={1}
      backgroundColor="#425A70"
      opacity={0.2}
      marginY={ITEM_HEIGHT}
      marginBottom={ITEM_SPACE}
    />

    <Pane width="100%" paddingX={ITEM_HEIGHT}>
      {children}

      <Pane display={isShown ? "flex" : "none"} paddingTop={ITEM_SPACE}>
        <Field name={`${path}.pickup_name`}>
          {({ input }) => (
            <TextInputField
              {...input}
              label="Hostel"
              placeholder="Hostel name"
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
  </Item>
);

BookingFormOptionalField.propTypes = {
  children: PropTypes.node.isRequired,
  ticket: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
};

export default BookingFormOptionalField;
