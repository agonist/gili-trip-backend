import React from "react";
import { Text } from "evergreen-ui";

const Small = props => (
  <Text
    fontSize={10}
    lineHeight={1.4}
    display="block"
    textTransform="uppercase"
    color="#66788A"
    marginBottom={4}
    {...props}
  />
);

export default Small;
