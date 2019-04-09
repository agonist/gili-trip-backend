import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { Heading, Pane, Paragraph, majorScale } from "evergreen-ui";

import Container from "./Container";

import backgroundImg from "../assets/185489.jpg";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const Header = ({ children }) => (
  <Pane
    className="Header"
    display="flex"
    justifyContent="center"
    flexDirection="column"
    paddingTop={ITEM_HEIGHT}
    paddingBottom={ITEM_HEIGHT / 2}
    background={`url(${backgroundImg}) bottom center`}
    backgroundSize="cover"
  >
  
    <Container>
      <Link
        to="/"
        style={{
          display: "inline-block",
          textDecoration: "none",
        }}
      >
        <Heading size={900} color="#fff" fontWeight={700}>
          Gili Trip
        </Heading>

        <Paragraph color="#fff" opacity={0.8} size={500}>
          Easy fast boat booking
        </Paragraph>
      </Link>

      <Pane
        width={ITEM_SPACE / 2}
        height={1}
        backgroundColor="#fff"
        marginY={ITEM_SPACE}
        opacity={0.8}
      />

      {children && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          padding={majorScale(3)}
          minHeight={156}
          backgroundColor="rgba(255, 255, 255, 0.8)"
          borderRadius={6}
        >
          {children}
        </Pane>
      )}
    </Container>
  </Pane>
);

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
