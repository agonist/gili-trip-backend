import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "./Container";
import Item from "./PopularItem";

import { ITEM_SPACE, LOCATIONS } from "../constants";

const getName = id => LOCATIONS.find(({ id: _id }) => _id === id).name;

const items = [
  {
    id: "pop-1",
    from: getName(2),
    to: getName(1),
  },
  {
    id: "pop-2",
    from: getName(2),
    to: getName(5),
  },
  {
    id: "pop-3",
    from: getName(3),
    to: getName(4),
  },
  {
    id: "pop-4",
    from: getName(1),
    to: getName(5),
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
