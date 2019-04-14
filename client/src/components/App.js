import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";

import Trips from "./TripsPage";
import PreBooking from "./PreBookingPage";
import Booking from "./BookingPage";
import Payment from "./BookingPaymentPage";
import Tos from "./TosPage";
import Privacy from "./PrivacyPage";
import Cookies from "./CookiesPage";
import Contact from "./ContactPage";

import TopMenu from "./TopMenu";
import Footer from "./Footer";

const App = () => (
  <div className="App">
    <TopMenu />
    <Root>
      <Router>
        <Trips path="/trips" />
        <PreBooking exact path="/booking" />
        <Booking exact path="/booking/:id" />
        <Payment path="/booking/:id/payment" />
        <Tos path="/terms" />
        <Privacy path="/privacy" />
        <Cookies path="/your-data" />
        <Contact path="/contact" />
        <Routes default />
      </Router>
    </Root>
    <Footer />
  </div>
);

export default App;
