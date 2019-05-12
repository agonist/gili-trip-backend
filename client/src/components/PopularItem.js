import React from "react";
import PropTypes from "prop-types";
import { Heading, Paragraph } from "evergreen-ui";

import Item from "./Item";
import useMedia from "../hooks/useMedia";
import { getLocationName } from "../helpers";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const PopularItem = ({ location, durationFromBali, bg, ...props }) => {
  const { isMobile } = useMedia();
  return (
    <Item
      display="block"
      className="Popular-item"
      flexGrow={1}
      cursor="pointer"
      width={isMobile ? "100%" : "50%"}
      paddingX={ITEM_HEIGHT}
      paddingY={ITEM_HEIGHT * 2}
      marginRight={ITEM_SPACE}
      background={`url(${bg}) center center`}
      backgroundSize="cover !important"
      textAlign="center"
      {...props}
    >
      <Heading size={600} fontWeight={600} color="#fff">
        {getLocationName(location)}
      </Heading>

      <Paragraph
        color="#fff"
        textTransform="uppercase"
        fontSize={12}
        opacity={0.7}
      >
        {durationFromBali} from Bali
      </Paragraph>
    </Item>
  );
};

PopularItem.propTypes = {
  location: PropTypes.string.isRequired,
  durationFromBali: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
};

export default PopularItem;
