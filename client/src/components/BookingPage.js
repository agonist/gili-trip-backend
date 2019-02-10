import React from "react";
import PropTypes from "prop-types";
import { Alert } from "evergreen-ui";

import BookingForm from "./BookingForm";
import Container from "./Container";
import Header from "./Header";

class BookingPage extends React.Component {
  constructor(props) {
    super(props);

    const { location, navigate } = props;
    const { state } = location;

    if (!state || (state && !state.tickets)) {
      navigate("/trips");
      return;
    }

    this.state = {
      formData: {
        tickets: state.tickets.map(({ id, departure_time }) => ({
          departure_time,
          trip_id: id,
        })),
      },
    };
  }

  handleFormSubmit = formData => {
    console.log("booking", formData);
  };

  render() {
    const { location } = this.props;
    const { formData } = this.state;
    const { tickets } = location.state;

    return (
      <div className="Page Page--trips">
        <Header />

        <Container>
          <Alert intent="warning" title="Your tickets are not reserved yet!" />

          <BookingForm
            initialValues={formData}
            tickets={tickets}
            onSubmit={this.handleFormSubmit}
          />
        </Container>
      </div>
    );
  }
}

BookingPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default BookingPage;
