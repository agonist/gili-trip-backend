import React from "react";
import { Heading, Icon, Pane } from "evergreen-ui";

import Container from "./Container";
import P from "./P";

import useMedia from "../hooks/useMedia";
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
    text:
      "We are here to answer and provide help regarding your trip. Ask us anything.",
  },
  {
    icon: "credit-card",
    title: "Pay securely",
    text:
      "Buy tickets with paypal and all international credit cards in total security.",
  },
];

const Tagline = () => {
  const { isMobile } = useMedia();

  return (
    <Container paddingBottom={0}>
      <Pane
        display={isMobile ? "block" : "flex"}
        justifyContent="space-between"
      >
        {items.map(({ icon, title, text }) => (
          <Pane
            key={title}
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
              <Heading>{title}</Heading>
              <P marginTop={isMobile ? 6 : ITEM_SPACE / 2}>{text}</P>
            </Pane>
          </Pane>
        ))}
      </Pane>
    </Container>
  );
};

export default Tagline;
