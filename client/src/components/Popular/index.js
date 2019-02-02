import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "../Container";
import Item from "../PopularItem";
import { LOCATIONS } from "../../constants";

const getName = id => LOCATIONS.find(({ id: _id }) => _id === id).name;

const items = [
  {
    id: 0,
    from: getName(2),
    to: getName(1),
  },
  {
    id: 1,
    from: getName(2),
    to: getName(5),
  },
  {
    id: 2,
    from: getName(3),
    to: getName(4),
  },
  {
    id: 3,
    from: getName(1),
    to: getName(5),
  },
];

const Popular = ({ onClick }) => (
  <Container paddingY="2rem" backgroundColor="#fafafa">
    <Heading size={700} marginBottom="1rem">
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
