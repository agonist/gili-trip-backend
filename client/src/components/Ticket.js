import React from "react";
import PropTypes from "prop-types";
import { Button, Pane, majorScale } from "evergreen-ui";

import Content from "./TicketContent";
import Icons from "./TicketIcons";
import Item from "./Item";
import Price from "./Price";
import OperatorLogo from "./OperatorLogo";
import { Mobile } from "./Media";

import { ITEM_SPACE } from "../constants";

const buttonHeight = 32;
const baseZindex = 10;

const pileItemProps = index => ({
  position: "absolute",
  bottom: `${0 - index * 5}%`,
  left: `${index * 2}%`,
  right: `${index * 2}%`,
  margin: 0,
  zIndex: baseZindex - index * 10,
});

const Ticket = ({
  arrival_time,
  departure_time,
  duration,
  handleSelect,
  handleUnselect,
  isSelected,
  price,
  canSelectTicket,
  vehicle,
}) => (
  <Mobile>
    {isMobile => (
      <Pane position="relative">
        <Item
          className={`Ticket ${isSelected && "is-selected"}`}
          position="relative"
          zIndex={baseZindex}
          cursor={isSelected ? "pointer" : "default"}
          onClick={isSelected ? handleUnselect : null}
          flexWrap="wrap"
        >
          <OperatorLogo {...vehicle} />

          <Content
            arrival_time={arrival_time}
            departure_time={departure_time}
            duration={duration}
          />

          {canSelectTicket && (
            <Pane
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              marginTop={isMobile ? ITEM_SPACE : 0}
            >
              <Price price={price} />

              <Pane height={buttonHeight} marginTop={majorScale(1)}>
                {isSelected ? (
                  <React.Fragment>
                    {isMobile ? (
                      <Button appearance="primary" intent="danger">
                        Cancel
                      </Button>
                    ) : (
                      <Icons />
                    )}
                  </React.Fragment>
                ) : (
                  <Button appearance="primary" onClick={handleSelect}>
                    Reserve
                  </Button>
                )}
              </Pane>
            </Pane>
          )}
        </Item>

        {isSelected &&
          [1, 2].map(value => (
            <Item
              key={value}
              style={{
                ...pileItemProps(value),
              }}
            />
          ))}
      </Pane>
    )}
  </Mobile>
);

Ticket.propTypes = {
  arrival_time: PropTypes.string.isRequired,
  departure_time: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  handleUnselect: PropTypes.func,
  isSelected: PropTypes.bool,
  price: PropTypes.string.isRequired,
  canSelectTicket: PropTypes.bool,
  vehicle: PropTypes.shape({}).isRequired,
};

Ticket.defaultProps = {
  canSelectTicket: true,
  handleSelect: null,
  handleUnselect: null,
  isSelected: false,
};

export default Ticket;
