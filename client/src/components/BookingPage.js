import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import {
  Alert,
  Button,
  Heading,
  IconButton,
  Pane,
  Paragraph,
  Spinner,
  toaster,
} from "evergreen-ui";

import BookingFormInner from "./BookingFormInner";
import BookingResume from "./BookingResume";
import Container from "./Container";
import CouponForm from "./CouponForm";
import Header from "./Header";
import Item from "./Item";
import TicketsTable from "./TicketsTable";

import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { flattenTickets, navigateWithData } from "../helpers";
import { fetchBooking, putBooking, validateCoupon } from "../api";

const itemProps = {
  flexDirection: "column",
  alignItems: "baseline",
  position: "relative",
};

const extractFormData = ({ booking_email, passengers, tickets }) => ({
  booking_email,
  passengers,
  tickets,
});

const notifyInvalidCoupon = code =>
  toaster.danger(`The coupon "${code}" is not valid`, {
    id: "invalid-coupon",
    duration: 5,
  });

const BookingPage = ({ id }) => {
  const [bookingData, setBookingData] = React.useState({});
  const [isFetchingBooking, setIsFetchingBooking] = React.useState(true);
  const [isEditingBooking, setIsEditingBooking] = React.useState(false);

  const bookingFormData = extractFormData(bookingData);
  const {
    booking_email,
    final_price,
    payment_status,
    quantity,
    tickets,
  } = bookingData;

  const hasPayed = payment_status === "success";

  const handleUpdateBookingData = data =>
    setBookingData({
      ...data,
      tickets: flattenTickets(data.tickets),
    });

  const handleFetchBooking = () => {
    const onSuccess = data => {
      handleUpdateBookingData(data);
      setIsFetchingBooking(false);
    };

    fetchBooking(id)
      .then(onSuccess)
      .catch(console.error);
  };

  const toggleSetIsEditingBooking = () =>
    setIsEditingBooking(!isEditingBooking);

  const handleValidateCoupon = ({ code }) => {
    if (!code) {
      return null;
    }

    const onError = err => console.error(err);

    return validateCoupon({
      code,
      booking_id: id,
    })
      .then(({ data }) => {
        const { valid } = data;

        if (!valid) {
          notifyInvalidCoupon(code);
        }
      })
      .catch(onError);
  };

  const handlePayment = async () => {
    navigateWithData(`/booking/${id}/payment`, {
      data: bookingData,
    });
  };

  const handleUpdateBooking = formData => {
    const onSuccess = data => {
      handleUpdateBookingData(data);
      setIsEditingBooking(false);
    };

    return putBooking(id, formData)
      .then(onSuccess)
      .catch(console.error);
  };

  React.useEffect(() => {
    handleFetchBooking();
  }, []);

  console.log(bookingData);

  return (
    <div className="Page Page--payment">
      <Header />

      <Container>
        {isFetchingBooking && (
          <Item>
            <Spinner />
          </Item>
        )}

        {hasPayed && (
          <Alert
            intent="success"
            title="Payment succeeded"
            marginBottom={ITEM_SPACE}
          >
            <Paragraph>
              Your tickets will be send by email at{" "}
              <strong>{booking_email}</strong>
            </Paragraph>
            <Paragraph>
              Thank you for purchasing on GiliTrip, we hope to see you soon!
            </Paragraph>
          </Alert>
        )}

        {!isFetchingBooking && !hasPayed && (
          <>
            <TicketsTable
              tickets={tickets}
              quantity={quantity}
              final_price={final_price}
              marginBottom={ITEM_SPACE}
            />

            <Pane display="flex" justifyContent="space-between">
              <Item
                {...itemProps}
                width={isEditingBooking ? "100%" : "70%"}
                marginRight={isEditingBooking ? 0 : ITEM_SPACE}
              >
                <IconButton
                  appearance="minimal"
                  icon="cog"
                  position="absolute"
                  top={ITEM_SPACE / 2}
                  right={ITEM_SPACE / 2}
                  onClick={toggleSetIsEditingBooking}
                />

                {isEditingBooking ? (
                  <Form
                    initialValues={{ ...bookingFormData, quantity }}
                    onSubmit={handleUpdateBooking}
                  >
                    {({ form, handleSubmit, submitting }) => (
                      <form onSubmit={handleSubmit}>
                        <BookingFormInner
                          quantity={quantity}
                          tickets={tickets}
                        />

                        <Button
                          appearance="primary"
                          isLoading={submitting}
                          marginTop={ITEM_SPACE}
                          type="submit"
                        >
                          EDIT INFORMATIONS
                        </Button>
                      </form>
                    )}
                  </Form>
                ) : (
                  <BookingResume {...bookingData} />
                )}
              </Item>

              {!isEditingBooking && (
                <Item {...itemProps} width="30%" justifyContent="end">
                  <Heading size={500} marginBottom={ITEM_SPACE}>
                    Promo code
                  </Heading>

                  <CouponForm onSubmit={handleValidateCoupon} />
                </Item>
              )}
            </Pane>

            {!isEditingBooking && (
              <Pane display="flex" justifyContent="flex-end">
                <Button
                  appearance="primary"
                  height={ITEM_HEIGHT}
                  iconAfter="arrow-right"
                  onClick={handlePayment}
                >
                  {`CONFIRM AND PAY ${final_price}${CURRENCY_SYMBOL}`}
                </Button>
              </Pane>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

BookingPage.propTypes = {
  id: PropTypes.string,
};

BookingPage.defaultProps = {
  id: undefined,
};

export default BookingPage;
