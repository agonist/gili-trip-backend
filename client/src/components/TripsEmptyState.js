import React from "react";
import { Icon, Paragraph, minorScale } from "evergreen-ui";

import Item from "./Item";

const TripsEmptyState = () => (
  <Item flexDirection="column">
    <Icon icon="info-sign" color="info" marginBottom={minorScale(1)} />
    <Paragraph>There is no trip matching your research</Paragraph>
  </Item>
);

export default TripsEmptyState;
