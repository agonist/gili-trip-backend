import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import { Spinner } from "evergreen-ui";

import Trips from "./TripsPage";
import PreBooking from "./PreBookingPage";
import Booking from "./BookingPage";

import Container from "./Container";
import TopMenu from "./TopMenu";
import Footer from "./Footer";
import Helmet from "react-helmet";

const LoadingState = () => (
  <Container>
    <Spinner />
  </Container>
);

const App = () => (
  <React.Suspense fallback={<LoadingState />}>
    <Root>
      <div className="App">
        <Helmet>

          <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=a025b92c-60b3-464f-9188-11939840dd43"> </script>

        </Helmet>
        <TopMenu />

        <Router>
          <Trips path="/trips" />
          <PreBooking exact path="/booking" />
          <Booking exact path="/booking/:id" />
          <Routes default />
        </Router>
        <Footer />
      </div>
    </Root>
  </React.Suspense>
);

export default App;
