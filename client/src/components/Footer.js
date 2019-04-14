import React from "react";
import { Link } from "@reach/router";
import { Pane, Text, Heading, Paragraph, majorScale } from "evergreen-ui";

import Container from "./Container";
import { Mobile } from "./Media";
import fb from "../assets/fb.png";
import ig from "../assets/ig.png";
import paypal from "../assets/paypal.png";

import { ITEM_SPACE } from "../constants";


const Footer = () => (

  <Mobile>
    {isMobile => (
      <Container  flexDirection="row">
      <hr/>
        <Pane
          height={200}
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          flexGrow={1}
          marginTop={majorScale(4)}
        >

          <Pane flexDirection="row" >
          <Heading marginBottom={majorScale(1)}>Book your travel</Heading>
          <Link to="/">
            <Paragraph fontWeight={500}>
              Bali to Gili Trawangan
            </Paragraph>
          </Link>
          <Link to="/">
            <Paragraph fontWeight={500}>
              Bali to Gili Air
            </Paragraph>
          </Link>
          <Link to="/">
            <Paragraph fontWeight={500}>
              Bali to Lombok
            </Paragraph>
          </Link>
          </Pane>

          <Pane >
          <Heading marginBottom={majorScale(1)}>Company</Heading>
          <Link to="/">
            <Paragraph fontWeight={500}>
              About us
            </Paragraph>
          </Link>
          <Link to="/terms">
            <Paragraph fontWeight={500}>
              Terms of service
            </Paragraph>
          </Link>
          <Link to="/privacy">
            <Paragraph fontWeight={500}>
              Privacy policy
            </Paragraph>
          </Link>
          <Link to="/your-data">
            <Paragraph fontWeight={500}>
              Cookies
            </Paragraph>
          </Link>
          <Link to="/contact">
            <Paragraph fontWeight={500}>
              Contact
            </Paragraph>
          </Link>
          </Pane>

          <Pane flexDirection="row">
          <Heading marginBottom={majorScale(1)}>Follow us</Heading>
          <Pane display="flex" justifyContent="space-between">
          <Link to="https://www.facebook.com/easygilitrip" flex={1}>
            <img
              width={32}
              src={fb}
              alt="Follow us on facebook"
            />
          </Link>
          <Link to="https://www.instagram.com/gili.trip/" flex={1}>
            <img
              width={32}
              src={ig}
              alt="Follow us on instagram"
            />
          </Link>
          </Pane>
          </Pane>

          <Pane flexDirection="row">
          <Heading marginBottom={majorScale(1)}>We accept</Heading>
          <img
            width={150}
            src={paypal}
            alt="we accept Paypal"
          />
          </Pane>

        </Pane>
        <Paragraph fontWeight={300} textAlign="center">
          Copyright © 2019 Gili Hidup Bebas
        </Paragraph>
      </Container>
    )}
  </Mobile>
);

export default Footer;
