import React from "react";
import { Location } from "@reach/router";

import PageComponent from "../components/TripsPage";

const TripsPage = () => (
  <Location>{props => <PageComponent {...props} />}</Location>
);

export default TripsPage;
