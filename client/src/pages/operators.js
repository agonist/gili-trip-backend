import React from "react";
import { Link } from "@reach/router";

import Container from "../components/Container";
import Header from "../components/Header";
import H1 from "../components/H1";
import H3 from "../components/H2";
import Item from "../components/Item";

import { ITEM_SPACE } from "../constants";
import wahanaLogo from "../assets/wahana-logo.png";

const OperatorsPage = () => (
  <div className="Page Page--operators">
    <Header />

    <Container>
      <H1 marginBottom={ITEM_SPACE}>Operators</H1>

      <Link to="/operator/wahana">
        <Item display="block" textAlign="center">
          <img
            style={{ display: "inline-block" }}
            width={100}
            src={wahanaLogo}
            alt="Wahana Gili Ocean"
          />
          <H3>Wahana Gili Ocean</H3>
        </Item>
      </Link>
    </Container>
  </div>
);

export default OperatorsPage;
