import React from "react";
import { Link } from "@reach/router";
import { Pane, Text } from "evergreen-ui";
import logo from "../assets/gili-trip-logo-boat.png";

import Container from "./Container";

import useMedia from "../hooks/useMedia";
import { ITEM_SPACE } from "../constants";

const TopMenu = () => {
  const { isMobile } = useMedia();

  const textProps = {
    fontWeight: 500,
    fontSize: isMobile ? 12 : 16,
    paddingX: isMobile ? ITEM_SPACE / 2 : ITEM_SPACE,
    paddingY: isMobile ? 6 : ITEM_SPACE,
  };

  const handleOpenZendeskChat = () =>
    window.zE && window.zE("webWidget", "open");

  return (
    <Container display="flex" alignItems="center">
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
        <Link to="/">
          <Text {...textProps}>Booking</Text>
        </Link>

        <Link to="/operators">
          <Text {...textProps}>Fast boats</Text>
        </Link>

        <button
          onClick={handleOpenZendeskChat}
          type="button"
          style={{
            padding: `${textProps.paddingY}px ${textProps.paddingX}px`,
            background: "transparent",
            border: 0,
          }}
        >
          <Text {...textProps} padding={0}>
            Contact
          </Text>
        </button>
      </Pane>
    </Container>
  );
};

export default TopMenu;
