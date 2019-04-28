import React from "react";
import { Icon, Pane } from "evergreen-ui";

import { ITEM_SPACE } from "../constants";

const LocationIcons = () => (
  <Pane
    width={ITEM_SPACE * 2}
    height={ITEM_SPACE * 2}
    marginRight={ITEM_SPACE}
    borderRadius="50%"
    backgroundColor="#DDEBF7"
    display="flex"
    alignItems="center"
    alignSelf="center"
    justifyContent="center"
  >
    <Icon icon="full-circle" size={7} color="#1070CA" />
  </Pane>
);

export default LocationIcons;
