import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane, Text } from "evergreen-ui";

import { Mobile } from "./Media";
import { ITEM_SPACE } from "../constants";

const IconWithBackground = () => (
  <Pane
    borderRadius="50%"
    backgroundColor="#DDEBF7"
    display="flex"
    alignItems="center"
    justifyContent="center"
    padding={ITEM_SPACE / 2}
    marginRight={ITEM_SPACE}
  >
    <Icon icon="full-circle" size={7} color="#1070CA" />
  </Pane>
);

const textProps = {
  display: "block",
  fontSize: 10,
  textTransform: "uppercase",
  color: "#66788A",
};

const TripsTitle = ({ from, to }) => (
  <Mobile>
    {isMobile => {
      const headerProps = {
        size: 500,
        display: isMobile ? "block" : "flex",
        alignItems: "center",
        marginBottom: ITEM_SPACE,
      };

      return (
        <Pane position="relative">
          <Pane
            position="absolute"
            left={11}
            top={24}
            bottom={23}
            width={1}
            backgroundColor="#DDEBF7"
          />

          <Heading {...headerProps}>
            <IconWithBackground />
            <Pane>
              <Text {...textProps}>From</Text>
              {from}
            </Pane>
          </Heading>

          <Heading {...headerProps}>
            <IconWithBackground />
            <Pane>
              <Text {...textProps}>To</Text>
              {to}
            </Pane>
          </Heading>
        </Pane>
      );
    }}
  </Mobile>
);

TripsTitle.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default TripsTitle;
