import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Heading, Pane, Paragraph, Link } from "evergreen-ui";
import logo from "../../assets/wahana-logo.png";

import Container from "./../Container";
import Header from "./../Header";
import { ITEM_HEIGHT, ITEM_SPACE } from "../../constants";

const WahanaPage = ({  }) => {
  return (
    <div className="Page Page--wahana">
      <Header />

      <Container>
        <Pane>
        <Heading size={900}>Wahana Gili Ocean</Heading>
        <br />
          <Pane display="flex">
          <Link to="/">
            <img
              width={400}
              src={logo}
              alt="Wahana Gili Ocean"
            />
          </Link>

          <Paragraph fontSize={16}>
            Wahana Gili Ocean is the fast boat company that started its operation in 2010. Based on Klungkung area, Bali. Wahana Gili Ocean fast boat are driven by strong commitment by its management and staff to provide a safe, comfortable, fast, and reliable service to ensure complete customer satisfaction.
          </Paragraph>
          </Pane>



          <br />
          <Paragraph fontSize={16}>
          As of today the company offer daily trips from Bali to Gili Trawangan, Gili Air and Lombok. They operate with 116 and 180 seats vessel depending on the frequentation. Traveling from Bali to the Gili islands take more or less 1h30.
          </Paragraph>
          <br />
          <Paragraph fontSize={16}>
          Wahana Gili Ocean offer as well free transfer from your hotel in Bali to the harbor in Padangbai (the name of the harbor), you can also be dropped off after the return trip at your hotel. If you are staying outside of the free transfer area, you can still get picked up but you will be charged with additional fees (see details below). If you have a doubt, do not hesitate to contact us for further details.
          </Paragraph>
          <br />
          <Heading size={700}>Contact</Heading>

        </Pane>

      </Container>
    </div>
  );
};

export default WahanaPage;
