import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane } from "evergreen-ui";

import Container from "./Container";
import Item from "./PopularItem";

import useMedia from "../hooks/useMedia";
import { ITEM_SPACE } from "../constants";

import bgBalipadangbai from "../assets/locations/bali-padangbai-filter.jpg";
import bgLombok from "../assets/locations/lombok-filter.jpg";
import bgGiliair from "../assets/locations/gili-air-filter.jpg";
import bgGiliTrawangan from "../assets/locations/gili-trawangan-filter.jpg";

const items = [
  {
    id: "pop-1",
    location: "4", // gili air
    durationFromBali: "1h30",
    bg: bgGiliair,
  },
  {
    id: "pop-2",
    location: "2", // lombok
    durationFromBali: "1h30",
    bg: bgLombok,
  },
  {
    id: "pop-3",
    location: "3", // gili trawangan
    durationFromBali: "1h30",
    bg: bgGiliTrawangan,
  },
  {
    id: "pop-4",
    location: "5", // gili meno
    durationFromBali: "1h30",
    bg: bgBalipadangbai,
  },
];

const Popular = ({ onClick }) => {
  const { isMobile } = useMedia();
  const renderItems = (from, to) =>
    items
      .slice(from, to)
      .map(item => (
        <Item
          key={item.id}
          onClick={() => onClick(item.location)}
          isMobile={isMobile}
          {...item}
        />
      ));

  return (
    <Container>
      <Heading size={700} marginBottom={ITEM_SPACE}>
        Popular destinations
      </Heading>

      {isMobile ? (
        renderItems(0, 4)
      ) : (
        <React.Fragment>
          <Pane display="flex">{renderItems(0, 2)}</Pane>
          <Pane display="flex">{renderItems(2, 4)}</Pane>
        </React.Fragment>
      )}
    </Container>
  );
};

Popular.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Popular;
