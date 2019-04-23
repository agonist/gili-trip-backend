import React from "react";
import { Link } from "@reach/router";
import { Pane, Text } from "evergreen-ui";
import logo from "../assets/gili-trip-logo-boat.png";

import Container from "./Container";
import { Mobile } from "./Media";

import { ITEM_SPACE } from "../constants";

const links = [
  {
    to: "/",
    text: "Booking",
  },
  {
    to: "/operators",
    text: "Fast boats",
  },
  {
    to: "#help",
    text: "Help",
  },
];

const TopMenu = () => (
  <Mobile>
    {isMobile => (
      <Container display="flex">
        <Link to="/">
          <img
            src={logo}
            width={isMobile ? 100 : 200}
            alt="Gili Trip, easy fast boat booking"
          />
        </Link>

        <Pane
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          {links.map(({ to, text }) => (
            <Link
              to={to}
              key={to}
              style={{
                display: "inline-block",
              }}
            >
              <Text
                fontWeight={500}
                fontSize={isMobile ? 12 : 16}
                paddingX={isMobile ? ITEM_SPACE / 2 : ITEM_SPACE * 2}
                paddingY={isMobile ? 6 : ITEM_SPACE}
              >
                {text}
              </Text>
            </Link>
          ))}
        </Pane>
      </Container>
    )}
  </Mobile>
);

export default TopMenu;
