import React from "react";
import cx from "classnames";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import { Spinner } from "evergreen-ui";

import Trips from "./TripsPage";
import PreBooking from "./PreBookingPage";
import Booking from "./BookingPage";

import Container from "./Container";
import TopMenu from "./TopMenu";
import Footer from "./Footer";

import useMedia from "../hooks/useMedia";

const LoadingState = () => (
  <Container>
    <Spinner />
  </Container>
);

const App = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();
  return (
    <React.Suspense fallback={<LoadingState />}>
      <Root>
        <div
          className={cx("App", {
            "is-mobile": isMobile,
            "is-tablet": isTablet,
            "is-desktop": isDesktop,
          })}
        >
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
};

export default App;
