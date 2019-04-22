import React from "react";
import PropTypes from "prop-types";
import Paypal from "paypal-checkout";
import BraintreeClient from "braintree-web/client";
import BraintreePaypalCheckout from "braintree-web/paypal-checkout";
import { Alert, Button, Heading, Pane, Paragraph, Spinner } from "evergreen-ui";

import Container from "./Container";
import Header from "./Header";
import Item from "./Item";

import { CONTACT_EMAIL, CURRENCY, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { navigateWithData } from "../helpers";
import { fetchPaymentToken, postPaymentCheckout } from "../api";

const CONTAINER_ID = "paypal-container";

const BookingPaymentPage = ({ location }) => {
  const [paymentToken, setPaymentToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasErrored, setHasErrored] = React.useState(false);

  const { id, final_price } = location.state;

  const handleCancel = () =>
    navigateWithData(`/booking/${id}`, {
      data: location.state,
    });

  const handleCheckout = nonce => {
    const onSuccess = ({ data }) =>
      navigateWithData(`/booking/${id}`, { data });

    const onError = err => {
      console.error(err);
      setHasErrored(true);
    };

    setIsLoading(true);

    return postPaymentCheckout({ id, nonce })
      .then(onSuccess)
      .catch(onError);
  };

  const renderPaypalButton = () => {
    Paypal.Button.render(
      {
        style: {
          size: "medium",
          layout: "horizontal",
          // fundingicons: "true",
        },
        locale: "en_US",
        braintree: {
          client: BraintreeClient,
          paypalCheckout: BraintreePaypalCheckout,
        },
        client: {
          production: "CLIENT_TOKEN_FROM_SERVER",
          sandbox: paymentToken,
        },
        env: "sandbox",
        commit: true,
        payment: (data, actions) =>
          actions.braintree.create({
            flow: "checkout",
            amount: final_price, // Required
            currency: CURRENCY, // Required
          }),
        onAuthorize: ({ nonce }) => handleCheckout(nonce),
        onRender: () => setIsLoading(false),
        onError(err) {
          console.error(err);
          setHasErrored(true);
        },
      },
      `#${CONTAINER_ID}`,
    ).catch(e => {
      console.log("wesh", e);
    });
  };

  React.useEffect(() => {
    fetchPaymentToken().then(({ token }) => setPaymentToken(token));
  }, []);

  React.useEffect(() => {
    if (paymentToken) {
      renderPaypalButton();
    }
  }, [paymentToken]);

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

        <Item textAlign="center">
          {isLoading && <Spinner />}
          <div
            id="paypal-container"
            style={{
              display: isLoading ? "hidden" : "block",
            }}
          />
        </Item>

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
