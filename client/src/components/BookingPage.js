import React from "react";
import PropTypes from "prop-types";
import { Alert } from "evergreen-ui";

import BookingForm from "./BookingForm";
import Container from "./Container";
import Header from "./Header";

import { postBooking } from "../api";
import { navigateWithData } from "../helpers";

const formatTicket = ({
  date,
  trip_id,
  pickup_address,
  pickup_city,
  pickup_name,
  pickup_room_number,
}) => ({
  trip_id,
  ...(pickup_address && { pickup_address }),
  ...(pickup_city && { pickup_city }),
  ...(pickup_name && { pickup_name }),
  ...(pickup_room_number && { pickup_room_number }),
  date: date.toISOString(),
});

const BookingPage = ({ location, navigate }) => {
  const { state } = location;
  const { quantity, tickets, bookingFormData } = state;

  if (!state || (state && !state.tickets)) {
    navigate("/trips");
  }

  const formatPayload = ({ booking_email_confirm, ...formData }) => ({
    ...formData,
    tickets: Object.values(tickets).map(formatTicket),
  });

  const handleFormSubmit = formData => {
    const { bookingId, bookingSuccessData, ...locationState } = location.state;
    const payload = formatPayload(formData);

    const extraData = {
      bookingData: locationState,
      bookingFormData: formData,
    };

    if (bookingId) {
      return navigateWithData(`/booking/${bookingId}`, {
        data: {
          ...bookingSuccessData,
          ...extraData,
        },
      });
    }

    const onSuccess = data =>
      navigateWithData(`/booking/${data.id}`, {
        data: {
          ...data,
          ...extraData,
        },
      });

    const onError = data => {
      console.log("onError", data);
    };

    return postBooking(payload)
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <div className="Page Page--trips">
      <Header />

      <Container>
        <Alert intent="warning" title="Your tickets are not reserved yet!" />

        <BookingForm
          initialValues={{ quantity, ...bookingFormData }}
          tickets={tickets}
          onSubmit={handleFormSubmit}
        />
      </Container>
    </div>
  );
};

BookingPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
  navigate: PropTypes.func,
};

BookingPage.defaultProps = {
  location: {},
  navigate: () => {},
};

export default BookingPage;
