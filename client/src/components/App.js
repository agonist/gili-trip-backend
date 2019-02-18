import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";

import Trips from "./TripsPage";
import Booking from "./BookingPage";
import BookingSuccess from "./BookingSuccessPage";

const App = () => (
  <div className="App">
    <Root>
      <Router>
        <Trips path="/trips" />
        <Booking exact path="/booking" />
        <BookingSuccess path="/booking/:id" />
        <Routes default />
      </Router>
    </Root>
  </div>
);

export default App;
