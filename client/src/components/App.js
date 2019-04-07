import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";

import Trips from "./TripsPage";
import PreBooking from "./PreBookingPage";
import Booking from "./BookingPage";

const App = () => (
  <div className="App">
    <Root>
      <Router>
        <Trips path="/trips" />
        <PreBooking exact path="/booking" />
        <Booking path="/booking/:id" />
        <Routes default />
      </Router>
    </Root>
  </div>
);

export default App;
