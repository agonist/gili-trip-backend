import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Heading, Pane, Paragraph, Spinner } from "evergreen-ui";

import Container from "./Container";
import Header from "./Header";
import Item from "./Item";

import { CONTACT_EMAIL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { navigateWithData } from "../helpers";
import { getDropinInstance, paymentCheckout } from "../api";

const BookingPaymentPage = ({ location }) => {
  const [dropinInstance, setDropinInstance] = React.useState(null);
  const [hasPaymentOption, setHasPaymentOption] = React.useState(false);
  const [hasErrored, setHasErrored] = React.useState(false);

  const { id, final_price } = location.state;

  const handleCancel = () =>
    navigateWithData(`/booking/${id}`, {
      data: location.state,
    });

  const handleCheckout = async ({ nonce }) => {
    const { data, status } = await paymentCheckout({ id, nonce });

    if (status !== 200) {
      setHasErrored(true);
      return;
    }

    console.log("do something with", data);
  };

  const handlePaymentMethodRequestable = () =>
    dropinInstance.requestPaymentMethod(handleCheckout);

  const handlePaymentOptionSelected = (...args) => {
    console.log(args);
    setHasPaymentOption(true);
  };

  React.useEffect(() => {
    getDropinInstance(final_price).then(setDropinInstance);
  }, []);

  React.useEffect(() => {
    if (dropinInstance) {
      dropinInstance.on(
        "paymentMethodRequestable",
        handlePaymentMethodRequestable,
      );

      dropinInstance.on("paymentOptionSelected", handlePaymentOptionSelected);
    }
  }, [!!dropinInstance]);

  return (
    <div className="Page Page--booking">
      <Header />

      <Container>
        <Heading size={700} marginBottom={ITEM_SPACE}>
          Payment
        </Heading>

        {hasErrored && (
          <Alert
            intent="danger"
            title="Something went wrong"
            marginBottom={ITEM_SPACE}
          >
            <Paragraph>
              Please contact us at
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <strong> {CONTACT_EMAIL}</strong>
              </a>
            </Paragraph>
          </Alert>
        )}

        {!dropinInstance && (
          <Item>
            <Spinner />
          </Item>
        )}

        {!hasErrored && (
          <Item id="payment-test" display={dropinInstance ? "block" : "none"} />
        )}

        {!hasPaymentOption && (
          <Pane display="flex" justifyContent="space-between">
            <Button
              appearance="primary"
              intent="danger"
              height={ITEM_HEIGHT}
              iconBefore="arrow-left"
              onClick={handleCancel}
              marginRight={ITEM_SPACE}
            >
              CANCEL AND GO BACK
            </Button>
          </Pane>
        )}
      </Container>
    </div>
  );
};

BookingPaymentPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }).isRequired,
};

export default BookingPaymentPage;
