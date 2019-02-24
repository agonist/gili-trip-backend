import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "./Container";
import Item from "./PopularItem";

import { ITEM_SPACE } from "../constants";

const items = [
  {
    id: "pop-1",
    from: "2",
    to: "1",
  },
  {
    id: "pop-2",
    from: "2",
    to: "5",
  },
  {
    id: "pop-3",
    from: "3",
    to: "4",
  },
  {
    id: "pop-4",
    from: "1",
    to: "5",
  },
];

const Popular = ({ onClick }) => (
  <Container>
    <Heading size={700} marginBottom={ITEM_SPACE}>
      Popular trips
    </Heading>

    <Pane display="flex">
      {items.slice(0, 2).map(({ id, ...item }) => (
        <Item key={id} onClick={() => onClick(item)} {...item} />
      ))}
    </Pane>

    <Pane display="flex">
      {items.slice(2, 4).map(({ id, ...item }) => (
        <Item key={id} onClick={() => onClick(item)} {...item} />
      ))}
    </Pane>
  </Container>
);

Popular.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Popular;
