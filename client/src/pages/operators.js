import React from "react";
import { Pane, Link } from "evergreen-ui";

import Container from "../components/Container";
import Header from "../components/Header";
import H1 from "../components/H1";
import H2 from "../components/H2";
import P from "../components/P";
import { Mobile } from "../components/Media";
import Item from "../components/Item";

import { ITEM_SPACE } from "../constants";
import wahanaLogo from "../assets/wahana-logo.png";

const logoWidth = 100;

const OperatorsPage = () => (
  <div className="Page Page--operators">
    <Header />

    <Container>
      <H1 marginBottom={ITEM_SPACE}>Operators</H1>

          <Link to="/operator/wahana">
          <Item >
          <img width={100}
              src={wahanaLogo} alt="Wahana Gili Ocean" />
          <H2>Wahana Gili Ocean</H2>
          </Item>
          </Link>


    </Container>
  </div>
);

export default OperatorsPage;
