import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import Duration from "./Duration";
import Time from "./Time";

const TicketContent = ({ arrival_time, departure_time, duration }) => (
  <Pane flexGrow={1} alignItems="center" justifyContent="center">
    <Pane display="flex" alignItems="center" justifyContent="center">
      <Pane textAlign="right">
        <Time title="Departure" value={departure_time} />
      </Pane>

      <Duration duration={duration} />

      <Pane textAlign="left">
        <Time title="Arrival" value={arrival_time} />
      </Pane>
    </Pane>
  </Pane>
);

TicketContent.propTypes = {
  arrival_time: PropTypes.string.isRequired,
  departure_time: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default TicketContent;
