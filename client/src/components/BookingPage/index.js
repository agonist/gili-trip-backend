import React from "react";
import PropTypes from "prop-types";

import { Alert, Heading, majorScale } from "evergreen-ui";

import BookingForm from "../BookingForm";
import Container from "../Container";
import Header from "../Header";
import Item from "../Item";
import TripItem from "../TripItem";

const BookingPage = ({ location: { state } }) => {
  const { tickets } = state;

  return (
    <div className="Page Page--trips">
      <Header />

      {tickets.map(ticket => (
        <Container key={ticket.id}>
          <Alert
            intent="warning"
            title="Your ticket is not reserved yet!"
            marginBottom={majorScale(2)}
          />

          <TripItem {...ticket} canSelectTicket={false} />

          <div style={{ height: majorScale(5) }} />

          <Heading size={700} textAlign="left" marginBottom={majorScale(2)}>
            Complete your trip
          </Heading>

          <Item justifyContent="normal">
            <BookingForm />
          </Item>
        </Container>
      ))}
    </div>
  );
};

BookingPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default BookingPage;
