import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { Heading, Pane, Paragraph, majorScale } from "evergreen-ui";

import backgroundImg from "../../assets/185489.jpg";
import Container from "../Container";

const Header = ({ children }) => (
  <div
    className="Header"
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      padding: `5rem 0 3rem 0`,
      background: `url(${backgroundImg}) bottom center`,
      backgroundSize: "cover",
    }}
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

      <div
        style={{
          width: "0.5rem",
          height: "1px",
          backgroundColor: "#fff",
          margin: `1rem 0 1rem 0`,
          opacity: 0.8,
        }}
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
  </div>
);

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
