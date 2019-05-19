import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Pane, Paragraph, TextInput, toaster } from "evergreen-ui";

import ButtonPrimary from "./ButtonPrimary";

import { validateCoupon } from "../api";
import { ITEM_SPACE } from "../constants";
import { captureException } from "../helpers";

const notifyInvalidCoupon = code =>
  toaster.danger(`The coupon "${code}" is not valid`, {
    id: "invalid-coupon",
    duration: 5,
  });

const notifyValidCoupon = code =>
  toaster.success(`The coupon "${code}" has been applied`, {
    id: "valid-coupon",
    duration: 5,
  });

const CouponForm = ({ bookingId: booking_id, onSuccess }) => {
  const [value, setValue] = React.useState("");

  const initialValues = {
    code: value,
  };

  const handleCouponSubmit = ({ code }) => {
    if (!code) {
      return null;
    }

    setValue(code);

    return validateCoupon({ code, booking_id })
      .then(({ data }) => {
        setValue("");

        if (data.valid === false) {
          notifyInvalidCoupon(code);
          return;
        }

        notifyValidCoupon(code);
        onSuccess(data);
      })
      .catch(captureException);
  };

  return (
    <Form initialValues={initialValues} onSubmit={handleCouponSubmit}>
      {({ form, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="code">
            {({ input }) => <TextInput {...input} width="100%" />}
          </Field>

          <Pane display="flex" flexWrap="wrap" alignItems="center">
            <ButtonPrimary
              isLoading={submitting}
              type="submit"
              marginTop={ITEM_SPACE}
              marginRight={ITEM_SPACE}
            >
              APPLY
            </ButtonPrimary>

            <Paragraph marginTop={ITEM_SPACE} fontSize={12} lineHeight={1.3}>
              Promo codes are not combinable
            </Paragraph>
          </Pane>
        </form>
      )}
    </Form>
  );
};

CouponForm.propTypes = {
  bookingId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CouponForm;
