import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Alert, Pane, Paragraph } from "evergreen-ui";

import BookingResume from "./BookingResume";
import Container from "./Container";
import Header from "./Header";
import Item from "./Item";
import { Mobile } from "./Media";

import {
  CONTACT_EMAIL,
  CURRENCY_SYMBOL,
  ITEM_HEIGHT,
  ITEM_SPACE,
} from "../constants";
import { formatTickets, navigateWithData } from "../helpers";
import { initPayment, paymentCheckout } from "../api";

const BookingPage = ({ id, location }) => {
  const { booking_email, extra, final_price, tickets } = location.state;
  const { bookingData } = extra;

  const [isLoading, setIsLoading] = React.useState(false);
  const [withPayment, setWithPayment] = React.useState(false);
  const [hasPayed, setHasPayed] = React.useState(false);
  const [hasErrored, setHasErrored] = React.useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    setWithPayment(true);

    try {
      const { nonce } = await initPayment({
        amount: final_price,
      });

      const { payment_status } = await paymentCheckout({ id, nonce });

      if (payment_status === "success") {
        setHasPayed(true);
        setWithPayment(false);
      } else {
        setHasErrored(true);
      }
    } catch (e) {
      setHasErrored(true);
    }
  };

  const handleEditInfos = () =>
    navigateWithData("/booking", {
      data: {
        ...bookingData,
        tickets: formatTickets(tickets),
        extra: {
          bookingId: id,
          ...extra,
        },
      },
    });

  return (
    <Mobile>
      {isMobile => (
        <div className="Page Page--trips">
          <Header />

          <Container>
            {hasPayed && (
              <Alert
                intent="success"
                title="Payment succeeded"
                marginBottom={ITEM_SPACE}
              >
                <Paragraph>
                  Your tickets will be send by email at
                  <strong> {booking_email}</strong>
                </Paragraph>
                <Paragraph>
                  Thank you for purchasing on GiliTrip, we hope to see you soon!
                </Paragraph>
              </Alert>
            )}

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

            {withPayment && (
              <Heading size={700} marginBottom={ITEM_SPACE}>
                Payment
              </Heading>
            )}

            {!withPayment && <BookingResume {...location.state} />}

            <Item
              id="payment-test"
              style={{ display: withPayment ? "block" : "none" }}
            />

            <Pane
              display="flex"
              justifyContent={withPayment ? "flex-end" : "space-between"}
            >
              {!withPayment && (
                <Button
                  height={ITEM_HEIGHT}
                  iconBefore="arrow-left"
                  onClick={handleEditInfos}
                  marginRight={ITEM_SPACE}
                >
                  {isMobile ? "Edit" : "Edit my informations"}
                </Button>
              )}

              <Button
                appearance="primary"
                height={ITEM_HEIGHT}
                iconAfter="arrow-right"
                onClick={handlePayment}
                isLoading={isLoading}
              >
                {isMobile
                  ? "Confirm and pay"
                  : `Confirm and pay ${final_price}${CURRENCY_SYMBOL}`}
              </Button>
            </Pane>
          </Container>
        </div>
      )}
    </Mobile>
  );
};

BookingPage.propTypes = {
  id: PropTypes.string,
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};

BookingPage.defaultProps = {
  id: null,
  location: {},
};

export default BookingPage;
