import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Button, TextInput } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const CouponForm = ({ initialValues, onSubmit }) => (
  <Form initialValues={initialValues} onSubmit={onSubmit}>
    {({ form, handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <Field name="code">
          {({ input }) => <TextInput {...input} width="100%" />}
        </Field>

        <Button
          appearance="primary"
          isLoading={submitting}
          type="submit"
          marginTop={ITEM_SPACE}
        >
          Apply
        </Button>
      </form>
    )}
  </Form>
);

CouponForm.propTypes = {
  initialValues: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

CouponForm.defaultProps = {
  initialValues: {},
};

export default CouponForm;
