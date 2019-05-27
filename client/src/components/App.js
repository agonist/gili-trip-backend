import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import { Spinner } from "evergreen-ui";
import Loadable from "react-loadable";

import Container from "./Container";
import TopMenu from "./TopMenu";
import Footer from "./Footer";
import ScrollUp from "./ScrollUp";

const LoadingState = () => (
  <Container>
    <Spinner />
  </Container>
);

const LoadableTrips = Loadable({
  loader: () => import("./TripsPage"),
  loading: LoadingState,
});

const LoadablePreBooking = Loadable({
  loader: () => import("./PreBookingPage"),
  loading: LoadingState,
});

const LoadableBooking = Loadable({
  loader: () => import("./BookingPage"),
  loading: LoadingState,
});

const App = () => (
  <React.Suspense fallback={<LoadingState />}>
    <Root>
      <div className="App">
        <TopMenu />
        <Router>
          <ScrollUp path="/">
            <LoadableTrips path="/trips" />
            <LoadablePreBooking exact path="/booking" />
            <LoadableBooking exact path="/booking/:id" />
            <Routes default />
          </ScrollUp>
        </Router>
        <Footer />
      </div>
    </Root>
  </React.Suspense>
);

export default App;
