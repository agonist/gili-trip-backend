import React from "react";
import { Pane, Paragraph } from "evergreen-ui";

import Container from "./Container";
import FooterLink from "./FooterLink";
import FooterHeading from "./FooterHeading";

import fbLogo from "../assets/fb-logo.svg";
import igLogo from "../assets/ig-logo.svg";
import paypal from "../assets/paypal.png";

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

const Footer = () => (
  <Pane borderTop="1px solid #E4E7EB">
    <Container display="flex" flexDirection="row">
      <Pane flexGrow={1}>
        <FooterHeading>Book your travel</FooterHeading>
        <FooterLink to="/">Bali to Gili Trawangan</FooterLink>
        <FooterLink to="/">Bali to Gili Air</FooterLink>
        <FooterLink to="/">Bali to Lombok</FooterLink>
      </Pane>

      <Pane flexGrow={1}>
        <FooterHeading>Company</FooterHeading>
        <FooterLink to="/">About us</FooterLink>
        <FooterLink to="/terms">Terms of service</FooterLink>
        <FooterLink to="/privacy">Privacy policy</FooterLink>
        <FooterLink to="/your-data">Cookies</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
      </Pane>

      <Pane flexGrow={1}>
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

      <Pane flexGrow={1}>
        <FooterHeading>We accept</FooterHeading>
        <img width={150} src={paypal} alt="we accept Paypal" />
      </Pane>
    </Container>

    <Paragraph textAlign="center">Copyright © 2019 Gili Hidup Bebas</Paragraph>
  </Pane>
);

export default Footer;
