import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Pane } from "evergreen-ui";

import BookingResume from "./BookingResume";
import Container from "./Container";
import Header from "./Header";
import Item from "./Item";
import { Mobile } from "./Media";

import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { formatTickets, navigateWithData } from "../helpers";
import { initPayment, paymentCheckout } from "../api";

const BookingSuccessPage = ({ id, location }) => {
  const { extra, final_price, tickets } = location.state;
  const { bookingData } = extra;

  const [isLoading, setIsLoading] = React.useState(false);
  const [withPayment, setWithPayment] = React.useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    setWithPayment(true);

    try {
      const { nonce } = await initPayment({
        amount: final_price,
      });

      const payload = await paymentCheckout({ id, nonce });

      console.log("success");
      console.log(payload);
    } catch (e) {
      console.error("failed");
      console.error(e);
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

BookingSuccessPage.propTypes = {
  id: PropTypes.string,
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};

BookingSuccessPage.defaultProps = {
  id: null,
  location: {},
};

export default BookingSuccessPage;
