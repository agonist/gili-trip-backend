import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { Alert, Button, Heading, Pane } from "evergreen-ui";

import BookingFormInner from "./BookingFormInner";
import Container from "./Container";
import Header from "./Header";
import Item from "./Item";
import TicketsTable from "./TicketsTable";
import TopMenu from "../components/TopMenu";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { postBooking } from "../api";
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
  const { bookingFormData } = extra;

  if (!state || (state && !state.tickets)) {
    navigate("/trips");
  }

  const handleFormSubmit = ({ tickets: ticketsPickupInfos, ...formData }) => {
    const payload = formatPayload(
      formData,
      mergeTickets(tickets, ticketsPickupInfos),
    );

    const extraData = {
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

    return postBooking(payload)
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <div className="Page Page--preBooking">
      <TopMenu/>
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

        <Form
          initialValues={{ quantity, ...bookingFormData }}
          onSubmit={handleFormSubmit}
        >
          {({ form, handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Heading
                size={700}
                marginTop={ITEM_HEIGHT}
                marginBottom={ITEM_SPACE}
              >
                Fill your informations
              </Heading>

              <Item flexDirection="column" alignItems="baseline">
                <BookingFormInner quantity={quantity} tickets={tickets} />
              </Item>

              <Pane textAlign="right">
                <Button
                  appearance="primary"
                  height={ITEM_HEIGHT}
                  iconAfter="arrow-right"
                  isLoading={submitting}
                  type="submit"
                >
                  CONTINUE TO PAYMENT
                </Button>
              </Pane>
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
