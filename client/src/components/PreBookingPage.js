import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { Alert, Heading } from "evergreen-ui";

import BookingFormInner from "./BookingFormInner";
import ButtonPrimary from "./ButtonPrimary";
import Container from "./Container";
import Header from "./Header";
import Item from "./Item";
import PageFooter from "./PageFooter";
import TicketsTable from "./TicketsTable";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { postBooking } from "../api";
import { captureException } from "../helpers";

const formatTicket = ({ date, ...data }) => ({
  ...data,
  date: date instanceof Date ? date.toISOString() : date,
});

const formatPayload = (formData, tickets) => ({
  ...formData,
  tickets: tickets.map(formatTicket),
});

const mergeTickets = (tickets, ticketsExtras = []) =>
  tickets.map((ticket, i) => ({
    ...ticket,
    ...ticketsExtras[i],
  }));

const calculateFinalPrice = (tickets, quantity) =>
  String(
    tickets.reduce((total, ticket) => total + Number(ticket.price), 0) *
      quantity,
  );

const PreBookingPage = ({ location, navigate }) => {
  const { state } = location;
  const { booking_type, quantity, tickets } = state;

  if (!state || (state && !state.tickets)) {
    navigate("/trips");
  }

  const handleFormSubmit = ({ tickets: ticketsPickupInfos, ...formData }) => {
    const payload = formatPayload(
      formData,
      mergeTickets(tickets, ticketsPickupInfos),
    );

    const onSuccess = ({ id }) => navigate(`/booking/${id}`);

    return postBooking(payload)
      .then(onSuccess)
      .catch(captureException);
  };

  const finalPrice = calculateFinalPrice(tickets, quantity);

  return (
    <div className="Page Page--preBooking">
      <Header />

      <Container>
        <Alert
          intent="warning"
          title="Your tickets are not booked yet!"
          marginBottom={ITEM_HEIGHT}
        />

        <TicketsTable
          {...state}
          final_price={finalPrice}
          full_price={finalPrice}
        />

        <Form
          initialValues={{ booking_type, quantity }}
          onSubmit={handleFormSubmit}
        >
          {({ form, handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Heading
                size={700}
                marginTop={ITEM_HEIGHT}
                marginBottom={ITEM_SPACE}
              >
                Complete personal information
              </Heading>

              <Item flexDirection="column" alignItems="baseline">
                <BookingFormInner quantity={quantity} tickets={tickets} />
              </Item>

              <PageFooter
                paddingRight={0}
                rightButton={
                  <ButtonPrimary
                    height={ITEM_HEIGHT}
                    iconAfter="arrow-right"
                    isLoading={submitting}
                    type="submit"
                  >
                    Confirm booking
                  </ButtonPrimary>
                }
              />
            </form>
          )}
        </Form>
      </Container>
    </div>
  );
};

PreBookingPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
  navigate: PropTypes.func,
};

PreBookingPage.defaultProps = {
  location: {},
  navigate: () => {},
};

export default PreBookingPage;
