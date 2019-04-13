import React from "react";
import PropTypes from "prop-types";
import { Pane, majorScale } from "evergreen-ui";

import Container from "./Container";

import backgroundImg from "../assets/185489.jpg";
import { ITEM_HEIGHT } from "../constants";

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
