import React from "react";
import PropTypes from "prop-types";
import { Pane } from "evergreen-ui";

import useMedia from "../hooks/useMedia";
import { getOperatorLogo } from "../helpers";
import { ITEM_SPACE } from "../constants";

const OperatorLogo = ({ id, subtype, ...props }) => {
  const { isMobile } = useMedia();

  return (
    <Pane {...props}>
      <img
        src={getOperatorLogo(id)}
        alt={subtype}
        width={80}
        style={{
          display: "block",
          marginBottom: isMobile ? ITEM_SPACE : 0,
        }}
      />
    </Pane>
  );
};

OperatorLogo.propTypes = {
  id: PropTypes.number.isRequired,
  subtype: PropTypes.string.isRequired,
};

export default OperatorLogo;
