import React from "react";
import PropTypes from "prop-types";
import { Alert } from "evergreen-ui";

import BookingForm from "./BookingForm";
import Container from "./Container";
import Header from "./Header";
import TicketsTable from "./TicketsTable";

import { ITEM_HEIGHT } from "../constants";
import { postBooking, putBooking } from "../api";
import { navigateWithData } from "../helpers";

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

const PreBookingPage = ({ location, navigate }) => {
  const { state } = location;
  const { final_price, quantity, tickets, extra = {} } = state;
  const { bookingId, bookingFormData } = extra;

  if (!state || (state && !state.tickets)) {
    navigate("/trips");
  }

  const handleFormSubmit = ({ tickets: ticketsPickupInfos, ...formData }) => {
    const payload = formatPayload(
      formData,
      mergeTickets(tickets, ticketsPickupInfos),
    );

    const extraData = {
      bookingData: state,
      bookingFormData: formData,
    };

    const onSuccess = data =>
      navigateWithData(`/booking/${data.id}`, {
        data: {
          ...data,
          extra: extraData,
        },
      });

    const onError = data => {
      console.log("onError", data);
    };

    if (bookingId) {
      return putBooking(bookingId, payload)
        .then(onSuccess)
        .catch(onError);
    }

    return postBooking(payload)
      .then(onSuccess)
      .catch(onError);
  };

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
          tickets={tickets}
          quantity={quantity}
          final_price={final_price}
        />

        <BookingForm
          initialValues={{ quantity, ...bookingFormData }}
          tickets={tickets}
          onSubmit={handleFormSubmit}
        />
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
