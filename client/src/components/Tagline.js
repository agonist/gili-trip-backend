import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "./Container";
import Item from "./TaglineItem";
import { Mobile } from "./Media";

import { ITEM_SPACE } from "../constants";

const items = [
  {
    id: 1,
    icon: "tag",
    title: "Find the best price for your journey",
    text: "Compare prices of the different boat trip instantly, no need to bargain!",
  },
  {
    id: 2,
    icon: "help",
    title: "Do you have any questions?",
    text: "We are here to answer and provide help regarding your trip. Ask us.",
  },
  {
    id: 3,
    icon: "credit-card",
    title: "Pay securely",
    text: "Buy tickets with paypal and all international credit cards in total security.",
  }
];

const Tagline = ({ }) => (
  <Container>
    <Mobile>
      {isMobile => {
        const renderItems = (from, to) =>
          items
            .slice(from, to)
            .map(({ id, ...item }) => (
              <Item
                key={id}
                onClick={() => onClick(item)}
                isMobile={isMobile}
                {...item}
              />
            ));

        return isMobile ? (
          renderItems(0, 3)
        ) : (
          <React.Fragment>
            <Pane display="flex" justifyContent="space-between">
            {renderItems(0, 3)}
            </Pane>

          </React.Fragment>
        );
      }}
    </Mobile>
  </Container>
);

Tagline.propTypes = {

};

export default Tagline;
