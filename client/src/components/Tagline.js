import React from "react";
import { Heading, Paragraph, Icon, Pane } from "evergreen-ui";

import Container from "./Container";
import { Mobile } from "./Media";

import { ITEM_SPACE } from "../constants";

const items = [
  {
    icon: "tag",
    title: "Find the best price for your journey",
    text:
      "Compare prices of the different boat trip instantly, no need to bargain!",
  },
  {
    icon: "help",
    title: "Do you have any questions?",
    text: "We are here to answer and provide help regarding your trip. Ask us.",
  },
  {
    icon: "credit-card",
    title: "Pay securely",
    text:
      "Buy tickets with paypal and all international credit cards in total security.",
  },
];

const Tagline = () => (
  <Mobile>
    {isMobile => (
      <Container paddingBottom={0}>
        <Pane
          display={isMobile ? "block" : "flex"}
          justifyContent="space-between"
        >
          {items.map(({ icon, title, text }) => (
            <Pane
              display="flex"
              flexDirection="row"
              flex={1}
              padding={ITEM_SPACE}
              paddingLeft={ITEM_SPACE / 2}
            >
              <Icon
                icon={icon}
                size={ITEM_SPACE}
                marginTop={ITEM_SPACE / 2}
                color="#34d1b6"
                flexShrink={0}
              />

              <Pane paddingLeft={ITEM_SPACE}>
                <Heading marginBottom={isMobile ? 6 : ITEM_SPACE / 2}>
                  {title}
                </Heading>
                <Paragraph>{text}</Paragraph>
              </Pane>
            </Pane>
          ))}
        </Pane>
      </Container>
    )}
  </Mobile>
);

export default Tagline;
