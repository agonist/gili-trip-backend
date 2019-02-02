import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "../Container";
import Item from "../PopularItem";
import { LOCATIONS } from "../../constants";

const getName = id => LOCATIONS.find(({ id: _id }) => _id === id).name;

const items = [
  {
    id: "pop-1",
    from: getName("loc-2"),
    to: getName("loc-1"),
  },
  {
    id: "pop-2",
    from: getName("loc-2"),
    to: getName("loc-5"),
  },
  {
    id: "pop-3",
    from: getName("loc-3"),
    to: getName("loc-4"),
  },
  {
    id: "pop-4",
    from: getName("loc-1"),
    to: getName("loc-5"),
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
