import React from "react";
import PropTypes from "prop-types";
import { Heading, Icon, Pane } from "evergreen-ui";

import Checkbox from "./Checkbox";
import OperatorLogo from "./OperatorLogo";
import Small from "./Small";

import useMedia from "../hooks/useMedia";
import { CURRENCY_SYMBOL, ITEM_HEIGHT, ITEM_SPACE } from "../constants";

const BORDER = "1px solid #E4E7EB";

const Ticket = ({
  arrival_time,
  departure_time,
  from,
  to,
  handleSelect,
  hasBorder,
  isSelected,
  price,
  vehicle,
  operator,
}) => {
  const { isMobile, isDesktop } = useMedia();

  const spacingX = isMobile ? ITEM_SPACE : ITEM_HEIGHT;
  const spacingY = isMobile ? ITEM_SPACE : ITEM_SPACE * 1.5;

  const headingProps = {
    size: isMobile ? 400 : 600,
    fontWeight: 400,
    is: "p",
  };

  const renderOperator = () => (
    <Heading {...headingProps}>
      <Small>Operator</Small>
      {operator.name}
    </Heading>
  );

  const renderOperatorLogo = () => (
    <OperatorLogo {...vehicle} style={{ margin: "0 auto" }} />
  );

  const renderLocations = () => (
    <Pane flexGrow={1} display="flex" justifyContent="center">
      <Heading {...headingProps} textAlign="right">
        <Small>{from.name}</Small>
        {departure_time}
      </Heading>

      <Pane
        paddingX={isMobile ? 4 : ITEM_SPACE}
        alignSelf="flex-end"
        opacity={0.7}
      >
        {!isMobile && <Icon icon="arrow-right" />}
      </Pane>

      <Heading {...headingProps} textAlign="left">
        <Small>{to.name}</Small>
        {arrival_time}
      </Heading>
    </Pane>
  );

  const renderPrice = () => (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading {...headingProps} fontWeight={600} marginBottom={ITEM_SPACE / 2}>
        {`${price}${CURRENCY_SYMBOL}`}
      </Heading>

      <Checkbox isChecked={isSelected} />
    </Pane>
  );

  return (
    <Pane
      className="Ticket"
      display="flex"
      width="100%"
      borderBottom={hasBorder ? "1px solid #E4E7EB" : "none"}
    >
      <Pane
        flexGrow={1}
        display={!isMobile ? "flex" : "block"}
        paddingX={spacingX}
        paddingY={spacingY}
        textAlign={!isMobile ? "left" : "center"}
        alignItems="center"
      >
        <Pane textAlign="center">
          {renderLocations()}
          <Pane height={ITEM_SPACE} />
          {/* {renderOperatorLogo()} */}
          {renderOperator()}
        </Pane>
        {/* {isDesktop && (
          <Pane paddingRight={ITEM_SPACE}>{renderOperatorLogo()}</Pane>
        )} */}

        {/* {isMobile ? (
          <>
            {renderLocations()}
            <Pane height={ITEM_SPACE / 2} />
            {renderOperator()}
          </>
        ) : (
          <>
            {renderOperator()}
            {renderLocations()}
          </>
        )} */}
      </Pane>

      <Pane
        width={isMobile ? 120 : 150}
        borderLeft={BORDER}
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
  arrival_time: PropTypes.string.isRequired,
  departure_time: PropTypes.string.isRequired,
  handleSelect: PropTypes.func,
  hasBorder: PropTypes.bool,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  vehicle: PropTypes.shape({}).isRequired,
  from: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  operator: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Ticket.defaultProps = {
  handleSelect: null,
  hasBorder: false,
  isSelected: false,
};

export default Ticket;
