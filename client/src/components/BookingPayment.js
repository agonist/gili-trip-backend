import React from "react";
import PropTypes from "prop-types";
import BraintreeClient from "braintree-web/client";
import BraintreePaypalCheckout from "braintree-web/paypal-checkout";
import { Alert, Paragraph, Spinner } from "evergreen-ui";

import Item from "./Item";

import { CONTACT_EMAIL, CURRENCY, ITEM_SPACE, IS_DEV } from "../constants";
import { fetchPaymentToken, postPaymentCheckout } from "../api";

const PayPalCheckout =
  typeof document !== "undefined" ? require("paypal-checkout").default : {};

const ENV = IS_DEV ? "sandbox" : "production";
const CONTAINER_ID = "paypal-container";

const BookingPayment = ({ bookingId, final_price, onSuccess }) => {
  const [paymentToken, setPaymentToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasErrored, setHasErrored] = React.useState(false);

  const handleCheckout = nonce => {
    const _onSuccess = data => {
      setIsLoading(false);
      onSuccess(data);
    };

    const onError = err => {
      console.error(err);
      setHasErrored(true);
    };

    setIsLoading(true);

    return postPaymentCheckout({ id: bookingId, nonce })
      .then(_onSuccess)
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
          [ENV]: paymentToken,
        },
        env: ENV,
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
    <Item>
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

      {isLoading && <Spinner />}

      <div
        id="paypal-container"
        style={{
          display: isLoading ? "hidden" : "block",
        }}
      />
    </Item>
  );
};

BookingPayment.propTypes = {
  bookingId: PropTypes.string.isRequired,
  final_price: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default BookingPayment;
