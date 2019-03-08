import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Pane } from "evergreen-ui";

import BookingResume from "./BookingResume";
import Container from "./Container";
import Header from "./Header";
import Item from "./Item";

import { ITEM_HEIGHT, ITEM_SPACE, IS_MOBILE } from "../constants";
import { navigateWithData } from "../helpers";
import { initPayment } from "../api";

const BookingSuccessPage = ({ id, location }) => {
  const { bookingData, bookingFormData, ...state } = location.state;
  const { currency, full_price } = state;
  const [isLoading, setIsLoading] = React.useState(false);
  const [withPayment, setWithPayment] = React.useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    setWithPayment(true);

    initPayment();
  };
  const handleEditInfos = () =>
    navigateWithData("/booking", {
      data: {
        ...bookingData,
        bookingId: id,
        bookingFormData,
        bookingSuccessData: state,
      },
    });

  return (
    <div className="Page Page--trips">
      <Header />
      <Container>
        <Heading size={700} marginBottom={ITEM_SPACE}>
          {withPayment ? "Payment" : "Your informations"}
        </Heading>

        {!withPayment && <BookingResume {...state} {...bookingData} />}

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
              {IS_MOBILE ? "Edit" : "Edit my informations"}
            </Button>
          )}

          <Button
            appearance="primary"
            height={ITEM_HEIGHT}
            iconAfter="arrow-right"
            onClick={handlePayment}
            isLoading={isLoading}
          >
            Confirm and pay {full_price} {currency}
          </Button>
        </Pane>
      </Container>
    </div>
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
