import React from "react";
import { Icon, Pane, majorScale } from "evergreen-ui";

const iconSize = majorScale(3);

const TicketIcons = () => (
  <Pane
    className="Ticket-icons"
    width={iconSize}
    height={iconSize}
    position="relative"
  >
    <span className="Ticket-icon Ticket-icon--circle">
      <Icon size={iconSize} icon="tick-circle" color="success" />
    </span>
    <span className="Ticket-icon Ticket-icon--ban">
      <Icon size={iconSize} icon="ban-circle" color="danger" />
    </span>
  </Pane>
);

export default TicketIcons;
