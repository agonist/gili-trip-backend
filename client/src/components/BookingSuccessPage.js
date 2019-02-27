import React from "react";
import PropTypes from "prop-types";
import { Button, Heading, Pane } from "evergreen-ui";

import BookingResume from "./BookingResume";
import Container from "./Container";
import Header from "./Header";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { navigateWithData } from "../helpers";

const BookingSuccessPage = ({ id, location }) => {
  const { bookingData, bookingFormData, ...locationState } = location.state;

  const handlePayment = () => {
    console.log("Money money money");
  };

  const handleEditInfos = () =>
    navigateWithData("/booking", {
      data: {
        ...bookingData,
        bookingId: id,
        bookingFormData,
        bookingSuccessData: locationState,
      },
    });

  return (
    <div className="Page Page--trips">
      <Header />
      <Container>
        <Heading size={700} marginBottom={ITEM_SPACE}>
          Your informations
        </Heading>

        <BookingResume {...locationState} />

        {/* <pre>
          <code>{JSON.stringify(location.state, null, 2)}</code>
        </pre> */}

        <Pane display="flex" justifyContent="space-between">
          <Button
            height={ITEM_HEIGHT}
            iconBefore="arrow-left"
            onClick={handleEditInfos}
          >
            Edit my informations
          </Button>

          <Button
            appearance="primary"
            height={ITEM_HEIGHT}
            iconAfter="arrow-right"
            onClick={handlePayment}
          >
            Confirm and pay
          </Button>
        </Pane>
      </Container>
    </div>
  );
};

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
