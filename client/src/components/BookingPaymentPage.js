import React from "react";
import PropTypes from "prop-types";
import BraintreeClient from "braintree-web/client";
import BraintreePaypalCheckout from "braintree-web/paypal-checkout";
import { Alert, Button, Heading, Paragraph, Spinner } from "evergreen-ui";

import Container from "./Container";
import Header from "./Header";
import Item from "./Item";
import PageFooter from "./PageFooter";

import { CONTACT_EMAIL, CURRENCY, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { navigateWithData } from "../helpers";
import { fetchPaymentToken, postPaymentCheckout } from "../api";

const PayPalCheckout =
  typeof document !== "undefined" ? require("paypal-checkout").default : {};

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
    PayPalCheckout.Button.render(
      {
        style: { size: "medium", layout: "horizontal" },
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
        onError: () => setHasErrored(true),
      },
      `#${CONTAINER_ID}`,
    ).catch(e => {
      console.error("Payment error", e);
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

        <PageFooter
          paddingLeft={0}
          leftButton={
            <Button
              appearance="minimal"
              intent="danger"
              height={ITEM_HEIGHT}
              iconBefore="arrow-left"
              onClick={handleCancel}
              marginTop={ITEM_SPACE / 2}
            >
              Wait, I forgot something
            </Button>
          }
        />
      </Container>
    </div>
  );
};

BookingPaymentPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};

BookingPaymentPage.defaultProps = {
  location: {},
};

export default BookingPaymentPage;
