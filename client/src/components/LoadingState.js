import React from "react";
import { Spinner } from "evergreen-ui";

import Item from "./Item";

const LoadingState = () => (
  <Item>
    <Spinner />
  </Item>
);

export default LoadingState;
