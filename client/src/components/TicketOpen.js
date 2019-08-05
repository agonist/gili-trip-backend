import React from "react";
import PropTypes from "prop-types";
import { Heading, Pane, Paragraph } from "evergreen-ui";

import Checkbox from "./Checkbox";
import Price from "./Price";

import useMedia from "../hooks/useMedia";
import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const BORDER = "1px solid #E4E7EB";

const Ticket = ({ handleSelect, isSelected, price }) => {
  const { isMobile } = useMedia();

  const spacingX = isMobile ? ITEM_SPACE : ITEM_HEIGHT;
  const spacingY = isMobile ? ITEM_SPACE : ITEM_SPACE * 1.5;

  const headingProps = {
    size: isMobile ? 400 : 600,
    fontWeight: 400,
    is: "p",
  };

  const renderPrice = () => (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingY={isMobile ? ITEM_SPACE : 0}
    >
      <Heading {...headingProps} fontWeight={600} marginBottom={ITEM_SPACE / 2}>
        <Price value={price} />
      </Heading>

      <Checkbox isChecked={isSelected} />
    </Pane>
  );

  return (
    <Pane
      className="Ticket"
      display="flex"
      width="100%"
      borderTop="1px solid #E4E7EB"
      alignItems="center"
    >
      <Pane
        display={isMobile ? "block" : "flex"}
        flexGrow={1}
        flexDirection="column"
        paddingLeft={spacingX}
        paddingRight={spacingX / 2}
        paddingY={spacingY}
        alignItems={isMobile ? "center" : "baseline"}
        borderRight={BORDER}
      >
        <Heading {...headingProps}>Open return</Heading>
        <Paragraph>
          You can choose your return date with the boat company as soon as you know it.
        </Paragraph>
      </Pane>

      <Pane
        width={isMobile ? 100 : 150}
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY={isMobile ? 0 : spacingY}
        cursor="pointer"
        onClick={handleSelect}
      >
        {renderPrice()}
      </Pane>
    </Pane>
  );
};

Ticket.propTypes = {
  handleSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
};

Ticket.defaultProps = {
  handleSelect: null,
  isSelected: false,
};

export default Ticket;
