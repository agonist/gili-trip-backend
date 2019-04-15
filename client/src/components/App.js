import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";

import Trips from "./TripsPage";
import PreBooking from "./PreBookingPage";
import Booking from "./BookingPage";
import Payment from "./BookingPaymentPage";
import Tos from "./legal/TosPage";
import Privacy from "./legal/PrivacyPage";
import Cookies from "./legal/CookiesPage";
import Contact from "./ContactPage";

import Wahana from "./operators/WahanaPage";

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
        <Wahana path="/operator/wahana" />
        <Routes default />
      </Router>
    </Root>
    <Footer />
  </div>
);

export default App;
