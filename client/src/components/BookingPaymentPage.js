import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Heading, Pane, Paragraph } from "evergreen-ui";

import Container from "./Container";
import Header from "./Header";
import Item from "./Item";

import { CONTACT_EMAIL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { navigateWithData } from "../helpers";
import { initPayment, paymentCheckout } from "../api";

const BookingPaymentPage = ({ location }) => {
  const [hasErrored, setHasErrored] = React.useState(false);

  const { id, final_price } = location.state;

  const handleCancel = () =>
    navigateWithData(`/booking/${id}`, {
      data: location.state,
    });

  const handlePayment = async () => {
    try {
      const { nonce } = await initPayment({
        amount: final_price,
      });

      const { payment_status } = await paymentCheckout({ id, nonce });

      if (payment_status === "success") {
        console.log("success, yay");
      } else {
        setHasErrored(true);
      }
    } catch (e) {
      setHasErrored(true);
    }
  };

  React.useEffect(() => {
    handlePayment();
  }, []);

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

        <Item id="payment-test" display="block" />

        <Pane display="flex" justifyContent="space-between">
          <Button
            appearance="primary"
            intent="danger"
            height={ITEM_HEIGHT}
            iconBefore="arrow-left"
            onClick={handleCancel}
            marginRight={ITEM_SPACE}
          >
            Cancel and go back
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
