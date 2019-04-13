import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { Heading, Pane, Paragraph, majorScale, Text } from "evergreen-ui";
import logo from "../assets/gili-trip-logo.png";

import Container from "./Container";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const TopMenu = ({  }) => (

  <Pane
    height={100}
    display="flex"
    border="default"
  >
    <Pane marginLeft={230} flex={1} alignItems="center" display="flex">
    <Link
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}>
        <img
          src={logo}
          width={150}
          style={{
            display: "block"
          }}
        />
    </Link>
    <Pane marginRight={230} marginTop={22} display="flex" flex={3} justifyContent="flex-end">
        <Link to="/" style={{
          textDecoration: "none"
        }}><Heading  marginRight={majorScale(2)}>Booking</Heading>
        </Link>

        <Link to="/" style={{
          textDecoration: "none"
        }}><Heading marginRight={majorScale(2)}>Fast boats</Heading>
        </Link>

        <Link to="/" style={{
          textDecoration: "none"
        }}><Heading  marginRight={majorScale(2)}>Help</Heading>
        </Link>
     </Pane>
    </Pane>
  </Pane>
);

export default TopMenu;
