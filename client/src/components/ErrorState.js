import React from "react";
import { Icon, Text, majorScale } from "evergreen-ui";

import Item from "./Item";

const ErrorState = () => (
  <Item>
    <Icon icon="error" color="danger" marginRight={majorScale(1)} />
    <Text>Something went wrong</Text>
  </Item>
);

export default ErrorState;
