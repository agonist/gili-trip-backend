import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import { Spinner } from "evergreen-ui";

import Trips from "./TripsPage";
import PreBooking from "./PreBookingPage";
import Booking from "./BookingPage";
import Payment from "./BookingPaymentPage";
// import Wahana from "./operators/WahanaPage";

import Container from "./Container";
import TopMenu from "./TopMenu";
import Footer from "./Footer";

const LoadingState = () => (
  <Container>
    <Spinner />
  </Container>
);

const App = () => (
  <React.Suspense fallback={<LoadingState />}>
    <Root>
      <div className="App">
        <TopMenu />

        <Router>
          <Trips path="/trips" />
          <PreBooking exact path="/booking" />
          <Booking exact path="/booking/:id" />
          <Payment path="/booking/:id/payment" />
          {/* <Wahana path="/operator/wahana" /> */}
          <Routes default />
        </Router>
        <Footer />
      </div>
    </Root>
  </React.Suspense>
);

export default App;
