import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "../Container";
import Item from "../PopularItem";

const items = [
  {
    id: 0,
    from: "Bali",
    to: "Bangkok",
  },
  {
    id: 1,
    from: "Paris",
    to: "Brussels",
  },
  {
    id: 2,
    from: "Bangkok",
    to: "Paris",
  },
];

const Popular = ({ onClick }) => (
  <Container paddingY="2rem">
    <Heading size={700} marginBottom="1rem">
      Popular trips
    </Heading>

    <Pane display="flex">
      {items.map(({ id, ...item }, i) => (
        <React.Fragment key={id}>
          <Item onClick={() => onClick(item)} {...item} />

          {i + 1 < items.length && (
            <div style={{ width: "1rem", flexShrink: 0 }} />
          )}
        </React.Fragment>
      ))}
    </Pane>
  </Container>
);

Popular.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Popular;
