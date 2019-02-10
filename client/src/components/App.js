import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";

import Trips from "./TripsPage";
import Booking from "./BookingPage";

const App = () => (
  <div className="App">
    <Root>
      <Router>
        <Trips path="/trips" />
        <Booking path="/booking" />
        <Routes default />
      </Router>
    </Root>
  </div>
);

export default App;
