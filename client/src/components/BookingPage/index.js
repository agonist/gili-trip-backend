import React from "react";
import PropTypes from "prop-types";
import { Alert, majorScale } from "evergreen-ui";

import Container from "../Container";
import Header from "../Header";
import TripItem from "../TripItem";

const BookingPage = ({ location: { state } }) => (
  <div className="Page Page--trips">
    <Header />

    <Container paddingY="2rem" backgroundColor="#fafafa">
      <Alert
        intent="warning"
        title="Your trip is not reserved yet!"
        marginBottom={majorScale(2)}
      />

      <TripItem {...state.ticket} canSelectTicket={false} />
    </Container>
  </div>
);

BookingPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default BookingPage;
