import React from "react";
import PropTypes from "prop-types";

import Container from "./Container";
import Header from "./Header";

const BookingSuccessPage = ({ id, location }) => (
  <div className="Page Page--trips">
    <Header />
    <Container>
      Success!
      <br />
      Booking id: {id}
      <pre>
        <code>{JSON.stringify(location.state, null, 2)}</code>
      </pre>
    </Container>
  </div>
);

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
