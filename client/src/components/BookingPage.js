import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { Alert, Button, Heading, Pane, Paragraph } from "evergreen-ui";

import BookingFormInner from "./BookingFormInner";
import BookingPayment from "./BookingPayment";
import BookingResume from "./BookingResume";
import ButtonPrimary from "./ButtonPrimary";
import Container from "./Container";
import CouponForm from "./CouponForm";
import ErrorState from "./ErrorState";
import Header from "./Header";
import Item from "./Item";
import LoadingState from "./LoadingState";
import TicketsTable from "./TicketsTable";

import useMedia from "../hooks/useMedia";
import { ITEM_SPACE } from "../constants";
import { flattenTickets } from "../helpers";
import { fetchBooking, putBooking } from "../api";

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

const BookingPage = ({ id, navigate }) => {
  const { isMobile } = useMedia();
  const [bookingData, setBookingData] = React.useState({});
  const [hasErrored, setHasErrored] = React.useState(false);
  const [isFetchingBooking, setIsFetchingBooking] = React.useState(true);
  const [isEditingBooking, setIsEditingBooking] = React.useState(false);

  const bookingFormData = extractFormData(bookingData);
  const { booking_email, final_price, payment_status, coupon } = bookingData;

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
      .catch(setHasErrored);
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

  const toggleSetIsEditingBooking = () =>
    setIsEditingBooking(!isEditingBooking);

  React.useEffect(() => {
    handleFetchBooking();
  }, []);

  return (
    <div className="Page Page--payment">
      <Header />

      <Container>
        {isFetchingBooking && !hasErrored && <LoadingState />}

        {hasPayed && (
          <Alert
            intent="success"
            title="Payment succeeded"
            marginBottom={ITEM_SPACE}
          >
            <Paragraph>
              Your tickets will be send by the boat company at{" "}
              <strong>{booking_email}</strong>,
                no actions is needed from your side.
            </Paragraph>

            <Paragraph>
              Thank you for purchasing on GiliTrip, we hope to see you soon!
            </Paragraph>
          </Alert>
        )}

        {hasErrored && (
          <ErrorState>
            <Button onClick={() => navigate("/")}>Go back to trips page</Button>
          </ErrorState>
        )}

        {!isFetchingBooking && !hasPayed && (
          <>
            <TicketsTable
              {...bookingData}
              marginBottom={ITEM_SPACE}
              coupon={coupon}
            />

            <Pane
              display={isMobile ? "block" : "flex"}
              justifyContent="space-between"
            >
              <Item
                {...itemProps}
                width={isMobile ? "100%" : "70%"}
                marginRight={ITEM_SPACE}
              >
                <Button
                  appearance="minimal"
                  iconAfter="cog"
                  position="absolute"
                  top={ITEM_SPACE / 2}
                  right={ITEM_SPACE / 2}
                  onClick={toggleSetIsEditingBooking}
                  color="default"
                >
                  Edit
                </Button>

                {isEditingBooking ? (
                  <Form
                    initialValues={bookingFormData}
                    onSubmit={handleUpdateBooking}
                  >
                    {({ form, handleSubmit, submitting }) => (
                      <form onSubmit={handleSubmit}>
                        <BookingFormInner {...bookingData} />
                        <ButtonPrimary
                          isLoading={submitting}
                          marginTop={ITEM_SPACE}
                          type="submit"
                        >
                          Save
                        </ButtonPrimary>
                      </form>
                    )}
                  </Form>
                ) : (
                  <BookingResume {...bookingData} />
                )}
              </Item>

              <Item
                {...itemProps}
                width={isMobile ? "100%" : "30%"}
                alignSelf="baseline"
              >
                <Heading size={500} marginBottom={ITEM_SPACE}>
                  Promo code
                </Heading>

                <CouponForm
                  bookingId={id}
                  onSuccess={handleUpdateBookingData}
                />
              </Item>
            </Pane>

            <BookingPayment
              bookingId={id}
              final_price={final_price}
              onSuccess={handleUpdateBookingData}
            />
          </>
        )}
      </Container>
    </div>
  );
};

BookingPage.propTypes = {
  id: PropTypes.string,
  navigate: PropTypes.func,
};

BookingPage.defaultProps = {
  id: undefined,
  navigate: () => {},
};

export default BookingPage;
