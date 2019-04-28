import React from "react";
import { Pane } from "evergreen-ui";

import Container from "./Container";
import FooterLink from "./FooterLink";
import FooterHeading from "./FooterHeading";
import P from "./P";

import fbLogo from "../assets/fb-logo.svg";
import igLogo from "../assets/ig-logo.svg";
import paypal from "../assets/paypal.png";

import useMedia from "../hooks/useMedia";
import { ITEM_SPACE } from "../constants";

const logoWrapperProps = {
  style: {
    display: "inline-block",
    marginRight: ITEM_SPACE / 2,
  },
  target: "_blank",
  rel: "noopener noreferrer",
};

const logoStyles = {
  width: 26,
};

const paneProps = {
  marginBottom: ITEM_SPACE,
};

const Footer = () => {
  const { isMobile } = useMedia();

  return (
    <Pane borderTop="1px solid #E4E7EB" paddingBottom={ITEM_SPACE * 2}>
      <Container
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
      >
        <Pane {...paneProps}>
          <FooterHeading>Company</FooterHeading>
          <FooterLink to="/terms">Terms of service</FooterLink>
          <FooterLink to="/privacy">Privacy policy</FooterLink>
          <FooterLink to="/your-data">Cookies</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </Pane>

        <Pane {...paneProps}>
          <FooterHeading>Operators</FooterHeading>
          <FooterLink to="/operator/wahana">Wahana</FooterLink>
        </Pane>

        <Pane {...paneProps}>
          <FooterHeading>Follow us</FooterHeading>
          <a {...logoWrapperProps} href="https://www.facebook.com/easygilitrip">
            <img
              styles={logoStyles}
              width={logoStyles.width}
              src={fbLogo}
              alt="Follow us on facebook"
            />
          </a>
          <a {...logoWrapperProps} href="https://www.instagram.com/gili.trip/">
            <img
              styles={logoStyles}
              width={logoStyles.width}
              src={igLogo}
              alt="Follow us on instagram"
            />
          </a>
        </Pane>

        <Pane {...paneProps}>
          <FooterHeading>We accept</FooterHeading>
          <img width={150} src={paypal} alt="we accept Paypal" />
        </Pane>
      </Container>

      <P textAlign="center">Copyright © 2019 Gili Hidup Bebas</P>
    </Pane>
  );
};

export default Footer;
