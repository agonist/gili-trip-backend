import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "../Container";
import Item from "../PopularItem";

const items = [
  {
    id: 0,
    from: "Bali",
    to: "Gili Trawanagan",
  },
  {
    id: 1,
    from: "Bali",
    to: "Gili Air",
  },
  {
    id: 2,
    from: "Bali",
    to: "Lombok",
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
