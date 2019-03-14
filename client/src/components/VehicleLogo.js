import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import { Mobile } from "./Media";
import { getVehicleLogo } from "../helpers";
import { ITEM_SPACE } from "../constants";

const VehicleLogo = ({ id, subtype, ...props }) => (
  <Mobile>
    {isMobile => (
      <Pane {...props}>
        <img
          src={getVehicleLogo(id)}
          alt={subtype}
          width={80}
          style={{
            display: "block",
            marginBottom: isMobile ? ITEM_SPACE : 0,
          }}
        />
      </Pane>
    )}
  </Mobile>
);

VehicleLogo.propTypes = {
  id: PropTypes.number.isRequired,
  subtype: PropTypes.string.isRequired,
};

export default VehicleLogo;
