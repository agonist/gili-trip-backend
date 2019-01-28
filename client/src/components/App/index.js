import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";

import Trips from "../TripsPage";

import "react-day-picker/lib/style.css";
import "./index.css";

const App = () => (
  <div className="App">
    <Root>
      <Router>
        <Trips path="/trips" />
        <Routes default />
      </Router>
    </Root>
  </div>
);

export default App;
