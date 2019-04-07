import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Heading, Pane } from "evergreen-ui";

import BookingResume from "./BookingResume";
import Container from "./Container";
import CouponForm from "./CouponForm";
import Header from "./Header";
import Item from "./Item";
import TicketsTable from "./TicketsTable";
import { Mobile } from "./Media";

import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { formatTickets, navigateWithData } from "../helpers";
import { validateCoupon } from "../api";

const itemProps = {
  flexDirection: "column",
  alignItems: "baseline",
};

const BookingPage = ({ id, location }) => {
  const { extra, final_price, quantity, tickets } = location.state;
  const { bookingData } = extra;

  const [hasCouponFailed, setHasCouponFailed] = React.useState(false);

  const handleValidateCoupon = ({ code }) => {
    if (!code) {
      return null;
    }

    return validateCoupon({
      code,
      booking_id: id,
    })
      .then(console.log)
      .catch(setHasCouponFailed);
  };

  const handlePayment = async () => {
    navigateWithData(`/booking/${id}/payment`, {
      data: location.state,
    });
  };

  const handleEditInfos = () =>
    navigateWithData("/booking", {
      data: {
        ...bookingData,
        tickets: formatTickets(tickets),
        extra: {
          bookingId: id,
          ...extra,
        },
      },
    });

  return (
    <Mobile>
      {isMobile => (
        <div className="Page Page--payment">
          <Header />

          <Container>
            {/* {hasPayed && (
              <Alert
                intent="success"
                title="Payment succeeded"
                marginBottom={ITEM_SPACE}
              >
                <Paragraph>
                  Your tickets will be send by email at
                  <strong> {booking_email}</strong>
                </Paragraph>
                <Paragraph>
                  Thank you for purchasing on GiliTrip, we hope to see you soon!
                </Paragraph>
              </Alert>
            )} */}

            <TicketsTable
              tickets={formatTickets(tickets)}
              quantity={quantity}
              final_price={final_price}
              marginBottom={ITEM_SPACE}
            />

            <Pane display="flex" justifyContent="space-between">
              <Item {...itemProps} width="70%" marginRight={ITEM_SPACE}>
                <BookingResume {...location.state} />
              </Item>

              <Item {...itemProps} width="30%" justifyContent="end">
                <Heading size={500} marginBottom={ITEM_SPACE}>
                  Coupon
                </Heading>

                <CouponForm onSubmit={handleValidateCoupon} />

                {hasCouponFailed && (
                  <Alert
                    intent="danger"
                    title="Coupon not valid"
                    width="100%"
                    marginTop={ITEM_SPACE}
                  />
                )}
              </Item>
            </Pane>

            <Pane display="flex" justifyContent="space-between">
              <Button
                height={ITEM_HEIGHT}
                iconBefore="arrow-left"
                onClick={handleEditInfos}
                marginRight={ITEM_SPACE}
              >
                {isMobile ? "Edit" : "Edit my informations"}
              </Button>

              <Button
                appearance="primary"
                height={ITEM_HEIGHT}
                iconAfter="arrow-right"
                onClick={handlePayment}
              >
                {isMobile
                  ? "Confirm and pay"
                  : `Confirm and pay ${final_price}${CURRENCY_SYMBOL}`}
              </Button>
            </Pane>
          </Container>
        </div>
      )}
    </Mobile>
  );
};

BookingPage.propTypes = {
  id: PropTypes.string,
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};

BookingPage.defaultProps = {
  id: null,
  location: {},
};

export default BookingPage;
