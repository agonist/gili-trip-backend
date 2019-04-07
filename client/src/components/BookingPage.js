import React from "react";
import PropTypes from "prop-types";
import { Button, Pane } from "evergreen-ui";

import BookingResume from "./BookingResume";
import Container from "./Container";
import Header from "./Header";
import { Mobile } from "./Media";

import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { formatTickets, navigateWithData } from "../helpers";

const BookingPage = ({ id, location }) => {
  const { extra, final_price, tickets } = location.state;
  const { bookingData } = extra;

  const handlePayment = async () => {
    navigateWithData(`/booking/${id}/payment`, {
      data: location.state,
    });
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
        <div className="Page Page--payment">
          <Header />

          <Container>
            {/* {hasPayed && (
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
            )} */}

            <BookingResume {...location.state} />

            <Pane display="flex" justifyContent="space-between">
              <Button
                height={ITEM_HEIGHT}
                iconBefore="arrow-left"
                onClick={handleEditInfos}
                marginRight={ITEM_SPACE}
              >
                {isMobile ? "Edit" : "Edit my informations"}
              </Button>

              <Button
                appearance="primary"
                height={ITEM_HEIGHT}
                iconAfter="arrow-right"
                onClick={handlePayment}
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
